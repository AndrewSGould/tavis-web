import { AccountRegistrationModel } from './account-registration.model';
import { PersonalRegistrationModel } from './personal-registration.model';

export interface RegistrationModel extends PersonalRegistrationModel, AccountRegistrationModel {

}
