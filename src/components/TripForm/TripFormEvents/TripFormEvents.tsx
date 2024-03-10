import classes from "./TripFormEvents.module.css";

type TripFormEventsProps = {
    tripID: string;
};

/**
 * Этот компонент будет сам полчать данные о событиях по ID поездки
 * Также он должен уметь добавлять новые события
 * и удалять существующие
 *
 * @param tripID
 * @constructor
 */
const TripFormEvents = ({ tripID }: TripFormEventsProps) => {
    // Получить данные о событиях по ID поездки tripID

    // Обработчик добавления найденного события в поездку

    // Обработчик удаления события из поездки

    return (
        <div className={classes.component}>
            <h3>События для поездки #name</h3>
            {/* Список событий в поездке tripID.
             у каждого события должна быть кнопка удаления
             */}

            <h3>Найти и сохранить событие в поездке</h3>

            {/*  инпут для поиска события

                найденные события отображаются в списке
                у каждого события должна быть кнопка добавления в поездку tripID

              */}
        </div>
    );
};

export { TripFormEvents };
