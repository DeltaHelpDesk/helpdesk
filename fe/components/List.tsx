import { FunctionComponent } from "react";
import ListItem from "./ListItem";
import { User } from "../interfaces";

interface IProps {
    items: User[];
}

const List: FunctionComponent<IProps> = ({ items }) => (
    <ul>
        {items.map((item) => (
            <li key={item.id}>
                <ListItem data={item} />
            </li>
        ))}
    </ul>
);

export default List;
