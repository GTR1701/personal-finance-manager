"use client"
import { useUserStore } from "@/store/userStore";
import { getCookie } from "cookies-next";

const Dashboard = () => {
	const user = getCookie('currentUser');
	const zustandUpdate = useUserStore((state) => state.setLoggedInUser);
	zustandUpdate(user);

	

	return user && (
		<div>
			<h1>User: {user}</h1>
		</div>
	);
};

export default Dashboard;
