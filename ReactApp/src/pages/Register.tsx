import { FC } from "react";
import SignUpForm from "../shared/components/authorization/SignUpForm";
interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
	return <SignUpForm submitForm={undefined} />;
};

export default Register;
