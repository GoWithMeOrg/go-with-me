import React from "react";

type Item = {
    _id: string;
    name?: string;
};

type FindAndSelectProps<ItemGeneric extends Item> = {
    items?: ItemGeneric[];
    finder: (value: string) => Promise<ItemGeneric[]>;
    deleter: (id: string) => void;
};

const FindAndSelect = <ItemGeneric extends Item>({ items, finder, deleter }: FindAndSelectProps<ItemGeneric>) => {
    const handleDelete = (_id: string) => {
        confirm("Вы уверены, что хотите удалить?") && deleter(_id);
    };

    const handleFind = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = event.currentTarget.find.value;
        const items = await finder(value);
        console.log("items: ", items); // eslint-disable-line
    };

    const handleSelect = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = event.currentTarget.select.value;
        console.log("value: ", value); // eslint-disable-line
    };

    return (
        <div className={"FindAndSelect"}>
            <div className={"Selected"}>
                {items?.map((item) => (
                    <div key={item._id}>
                        {item.name} <button onClick={() => handleDelete(item._id)}>X</button>
                    </div>
                ))}
            </div>

            <div className={"FindForm"}>
                <form onSubmit={handleFind}>
                    <input type="text" name="find" id="find" />
                    <button type="submit">Найти</button>
                </form>
            </div>

            <div className="SelectForm">
                <form onSubmit={handleSelect}>
                    <select name="select" id="select" multiple={true}>
                        {items?.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Сохранить выбранное</button>
                </form>
            </div>
        </div>
    );
};

export { FindAndSelect };
