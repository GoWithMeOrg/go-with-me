import type { NextPage } from "next";

import { ListForm } from "@/components/ListForm/ListForm";

const ListsPage: NextPage = () => {
    return (
        <div className="ListsPage">
            <main>
                <h3>Ваши круги</h3>
            </main>

            <aside>
                <h3>Добавить круг</h3>
                <ListForm />
            </aside>
        </div>
    );
};

export default ListsPage;
