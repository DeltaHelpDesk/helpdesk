import { FunctionComponent } from "react";
import { User } from "../interfaces";

interface IListDetailProps {
    item: User;
}

const ListDetail: FunctionComponent<IListDetailProps> = ({
    item: user,
}) => (
        <div>
            <h1>Detail for {user.name}</h1>
            <p>ID: {user.id}</p>
        </div>
    );

export default ListDetail;
