import { forwardRef, useRef, useState } from "react";
import classes from "./TitleField.module.css";
import { RefCallBack } from "react-hook-form";

interface ITitleField {
    // defaultValue: string | undefined;
    //onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    // titleRef: RefCallBack;
    name: string;
    ref: RefCallBack;
}

// export const TitleField = ({ ref }: ITitleField) => {
//     const [eventName, setEventName] = useState("");
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setEventName(e.target.value);
//         // if (onTitleChange) {
//         //     const changeEvent = Object.assign(Object.create(e), {
//         //         target: {
//         //             value: e.target.value,
//         //         },
//         //     });
//         //     onTitleChange(changeEvent);
//         // }
//     };

//     return (
//         <label className={classes.titleForm}>
//             <span className={classes.titleInput}>Event title</span>
//             <input
//                 className={classes.fieldInput}
//                 type="text"
//                 name="name"
//                 defaultValue={eventName}
//                 onChange={handleChange}
//                 required
//                 ref={ref}
//             />
//         </label>
//     );
// };

// export default TitleField;

export const TitleField = forwardRef(function TitleField(props, ref) {
    return (
        <label className={classes.titleForm}>
            <span className={classes.titleInput}>Event title</span>
            <input {...props} className={classes.fieldInput} />
        </label>
    );
});

export default TitleField;
