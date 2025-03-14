import { forwardRef, useEffect, useRef, useState } from "react";

import Plus from "@/assets/icons/plus.svg";
import Minus from "@/assets/icons/minus.svg";

import classes from "./CreateTag.module.css";

interface ICreateTag {
    eventTags: string[];
    onTagsChange?: (tags: string[]) => void;
    onChange: (e: string[]) => void;
    title: string;
}

export const CreateTag = forwardRef(function CreateTag(props: ICreateTag, ref) {
    const tagRef = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<string[]>(props.eventTags || []);
    const prevTagsRef = useRef<string[]>(tags ?? []);

    useEffect(() => {
        if (prevTagsRef.current !== tags) {
            props.onChange(tags);
            prevTagsRef.current = tags;
        }
    }, [tags, props]);

    const handleAddTag = () => {
        if (!tagRef.current?.value) return;
        const tag = tagRef.current?.value;
        const updatedTags: Set<string> = new Set(tags);
        updatedTags.add(tag);
        setTags(Array.from(updatedTags));
        tagRef.current!.value = "";
    };

    const handleDeleteTag = (tag: string) => {
        setTags((prevSelectedTags) => {
            return prevSelectedTags.filter((cat) => cat !== tag);
        });
    };

    const handleTagsChange = (tags: string[]) => {
        if (props.onTagsChange) props.onTagsChange(tags);
    };

    handleTagsChange(tags);

    return (
        <label className={classes.tagLabel}>
            <span className={classes.tagTitle}>{props.title}</span>
            <div className={classes.tagInputWrapper}>
                <input className={classes.tagInput} type="text" name="tag" ref={tagRef} />
                <Plus transform="scale(0.83)" className={classes.tagButton} onClick={handleAddTag} />
            </div>

            <div className={classes.selectedTagsWrapper}>
                <ul className={classes.selectedTags}>
                    {tags.map((tag, index) => (
                        <li key={index} className={classes.selectedTag}>
                            {tag}
                            <Minus style={{ marginLeft: "0.5rem" }} onClick={() => handleDeleteTag(tag)} />
                        </li>
                    ))}
                </ul>
            </div>
        </label>
    );
});

export default CreateTag;
