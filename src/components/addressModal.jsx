import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { apiRequest } from "../util/api";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const addressSchema = z.object({
    fullName: z.string().min(2, "Full name is required"),

    mobileNumber: z
        .string()
        .regex(/^[0-9]{10}$/, "Enter valid mobile number"),

    pincode: z
        .string()
        .regex(/^[0-9]{6}$/, "Enter valid pincode"),

    addressLine: z.string().min(5, "Address is required"),

    locality: z.string().optional(),

    city: z.string().min(2, "City is required"),

    state: z.string().min(2, "State is required"),

    country: z.string(),

    addressType: z.enum([
        "Home",
        "Work",
        "Other",
    ]),

    isDefault: z.boolean(),
});

const AddressModal = ({
    open,
    onClose,
    onSuccess,
}) => {
    const [loading, setLoading] = useState(false);

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            fullName: "",
            mobileNumber: "",
            pincode: "",
            addressLine: "",
            locality: "",
            city: "",
            state: "",
            country: "India",
            addressType: "Home",
            isDefault: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            await apiRequest("/addresses", {
                method: "POST",
                body: JSON.stringify(data),
            });

            reset();

            onClose();

            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Add New Address
                    </DialogTitle>
                </DialogHeader>

                <form
                    id="address-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    {/* Full Name */}
                    <div>
                        <label className="text-sm font-medium">
                            Full Name
                        </label>

                        <Input
                            placeholder="Enter full name"
                            {...register("fullName")}
                        />

                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* Mobile + Pincode */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">
                                Mobile Number
                            </label>

                            <Input
                                placeholder="9876543210"
                                {...register("mobileNumber")}
                            />

                            {errors.mobileNumber && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.mobileNumber.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Pincode
                            </label>

                            <Input
                                placeholder="144001"
                                {...register("pincode")}
                            />

                            {errors.pincode && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.pincode.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="text-sm font-medium">
                            Address
                        </label>

                        <Textarea
                            rows={4}
                            placeholder="House No, Street, Area..."
                            {...register("addressLine")}
                        />

                        {errors.addressLine && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.addressLine.message}
                            </p>
                        )}
                    </div>

                    {/* Locality */}
                    <div>
                        <label className="text-sm font-medium">
                            Locality
                        </label>

                        <Input
                            placeholder="Locality"
                            {...register("locality")}
                        />
                    </div>

                    {/* City + State */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium">
                                City
                            </label>

                            <Input
                                placeholder="City"
                                {...register("city")}
                            />

                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                State
                            </label>

                            <Input
                                placeholder="State"
                                {...register("state")}
                            />

                            {errors.state && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.state.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Country */}
                    <div>
                        <label className="text-sm font-medium">
                            Country
                        </label>

                        <Input
                            disabled
                            {...register("country")}
                        />
                    </div>

                    {/* Address Type */}
                    <div>
                        <label className="text-sm font-medium block mb-2">
                            Address Type
                        </label>

                        <Controller
                            control={control}
                            name="addressType"
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="Home">
                                            Home
                                        </SelectItem>

                                        <SelectItem value="Work">
                                            Work
                                        </SelectItem>

                                        <SelectItem value="Other">
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                    </div>

                    {/* Default Address */}
                    <Controller
                        control={control}
                        name="isDefault"
                        render={({ field }) => (
                            <div className="flex items-center gap-3">
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={
                                        field.onChange
                                    }
                                />

                                <label className="text-sm">
                                    Make this my default
                                    address
                                </label>
                            </div>
                        )}
                    />
                </form>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        form="address-form"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Save Address"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddressModal;