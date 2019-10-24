import { FunctionComponent } from "react";
import Link from "next/link";
import { User } from "../interfaces";

interface IProps {
    data: User;
}

const ListItem: FunctionComponent<IProps> = ({ data }) => (
    <Link href={`/detail?id=${data.id}`}>
        <a>
            {data.id}: {data.name}
        </a>
    </Link>
);

export default ListItem;
