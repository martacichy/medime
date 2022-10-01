import UserData from "../../../../models/UserData";
import UserResponseDto from "../dto/UserResponseDto";

export class FetchUserDataFromResponse {
    constructor(private userDataDto: UserResponseDto | null) { }
    
    public userDataFromResponse(): UserData | null {
        if (this.userDataDto) {
            const dto = this.userDataDto;

            return {
                ifDoctor: dto.IfDoctor,
                birthDate: dto.UsBirthDate,
                email: dto.UsEmail,
                firstName: dto.UsFirstName,
                id: dto.UsId,
                lastName: dto.UsLastName,
                description: dto.UserDescription,
            }
        }
        return null;
    }
}