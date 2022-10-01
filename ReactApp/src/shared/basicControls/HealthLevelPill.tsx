import { FC } from "react";
import { Pill } from "@thumbtack/thumbprint-react";

interface HealthLevelPillProps {
	value: string;
}

export const HealthLevelPill: FC<HealthLevelPillProps> = (
	props: HealthLevelPillProps
) => {
	return <Pill color={"blue"}>{props.value}</Pill>;
};

export default HealthLevelPill;
