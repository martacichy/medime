import { FC } from "react";
import UserResponseDto from "./services/api/dto/UserResponseDto";

interface ConfigureProfilProps {
	user?: UserResponseDto;
}

const CofigureProfil: FC<ConfigureProfilProps> = (
	props: ConfigureProfilProps
) => {
	return <CofigureProfil user={props.user} />;
};
export default CofigureProfil;
