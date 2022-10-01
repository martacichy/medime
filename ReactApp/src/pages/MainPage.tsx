import { FC } from "react";

interface MainPageProps {}

const MainPage: FC<MainPageProps> = (props: MainPageProps) => {
	return (
		<div className="main-container">
			<div className="wrapper app-wrapper-home">
				// tutaj dajesz wszystkie elementy: divy, label, pola itp które chcesz
			</div>
		</div>
	);
};
export default MainPage;
