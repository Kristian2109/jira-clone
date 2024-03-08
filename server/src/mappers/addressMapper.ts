import Address from "../entities/account/address";
import { RegisterAddressSchema } from "../types/account";

export default class AddressMapper {
    public static toAddress(address: RegisterAddressSchema): Address {
        let addressEntity = new Address();

        addressEntity.country = address.country;
        addressEntity.state = address.state;
        addressEntity.postalCode = address.postalCode;
        addressEntity.city = address.city;
        addressEntity.streetName = address.streetName;
        addressEntity.streetNumber = address.streetNumber;
        
        return addressEntity;
    }
}