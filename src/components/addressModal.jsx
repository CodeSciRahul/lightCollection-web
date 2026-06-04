import { Modal, Button, Input, SelectPicker, Checkbox } from "rsuite";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {apiRequest} from "../util/api"
import {useState} from "react"

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
    country: z.string().default("India"),
    addressType: z.enum(["Home", "Work", "Other"]),
    isDefault: z.boolean(),
});

const addressTypeOptions = [
    {
        label: "Home",
        value: "Home",
    },
    {
        label: "Work",
        value: "Work",
    },
    {
        label: "Other",
        value: "Other",
    },
];

const AddressModal = ({
    open,
    onClose,
}) => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
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

    const [loading, setLoading] = useState(false)

    const onSubmit = async (data) => {
        try {
            setLoading(true)
            console.log("data", data)
            // const apiRequest("/addresses")
            reset();
            onClose();
            
        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            size="md"
        >
            <Modal.Header>
                <Modal.Title>
                    Add New Address
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <form
                    id="address-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Full Name */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Full Name
                        </label>

                        <Input
                            {...register("fullName")}
                            placeholder="Enter full name"
                        />

                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>

                    {/* Mobile */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Mobile Number
                        </label>

                        <Input
                            {...register("mobileNumber")}
                            placeholder="9876543210"
                        />

                        {errors.mobileNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.mobileNumber.message}
                            </p>
                        )}
                    </div>

                    {/* Pincode */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Pincode
                        </label>

                        <Input
                            {...register("pincode")}
                            placeholder="144001"
                        />

                        {errors.pincode && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.pincode.message}
                            </p>
                        )}
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Address
                        </label>

                        <Input
                            as="textarea"
                            rows={3}
                            {...register("addressLine")}
                            placeholder="House No, Street, Area..."
                        />

                        {errors.addressLine && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.addressLine.message}
                            </p>
                        )}
                    </div>

                    {/* Locality */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Locality
                        </label>

                        <Input
                            {...register("locality")}
                            placeholder="Locality"
                        />
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 font-medium">
                                City
                            </label>

                            <Input
                                {...register("city")}
                                placeholder="City"
                            />

                            {errors.city && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.city.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                State
                            </label>

                            <Input
                                {...register("state")}
                                placeholder="State"
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
                        <label className="block mb-1 font-medium">
                            Country
                        </label>

                        <Input
                            {...register("country")}
                            disabled
                        />
                    </div>

                    {/* Address Type */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Address Type
                        </label>

                        <Controller
                            control={control}
                            name="addressType"
                            render={({ field }) => (
                                <SelectPicker
                                    block
                                    cleanable={false}
                                    data={addressTypeOptions}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    {/* Default Address */}
                    <div>
                        <Controller
                            name="isDefault"
                            control={control}
                            render={({ field }) => (
                                <Checkbox
                                    checked={field.value}
                                    onChange={(_, checked) =>
                                        field.onChange(checked)
                                    }
                                >
                                    Make this my default address
                                </Checkbox>
                            )}
                        />
                    </div>
                </form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    appearance="subtle"
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    appearance="primary"
                    loading={loading}
                    type="submit"
                    form="address-form"
                >
                    Save Address
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddressModal;