import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import List from "../../components/list";
import ListItem from "../../components/list-item";

const Dashboard: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  return (
    <div>
      <h1>Dashboard</h1>

      <List title="Apartment list">
        <ListItem key="1">
          <span>Apartment 1</span>
        </ListItem>
      </List>
    </div>
  );
};

export default Dashboard;
