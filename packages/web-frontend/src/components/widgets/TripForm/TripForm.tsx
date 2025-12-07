import { FC, FormEvent } from 'react';
import { TripFormEvents } from '@/components/widgets/TripForm/TripFormEvents/TripFormEvents';
import type { ITrip } from '@go-with-me/api-scheme/types/Trip';
import dayjs from 'dayjs';

import classes from './TripForm.module.css';

export type TripType = Partial<ITrip>;

interface TripFormProps {
  tripData: TripType;
  onSubmit: (event: Partial<ITrip>) => void;
  ref?: React.RefObject<HTMLFormElement>;
}

const TripForm: FC<TripFormProps> = ({ tripData, onSubmit }) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.currentTarget).entries());
    // Convert the form data to the correct types
    const onSubmitData: Partial<ITrip> = {
      organizer_id: tripData.organizer?._id,
      name: formData.name as string,
      description: formData.description as string,
      isPrivate: formData.isPrivate === 'on',
      startDate: dayjs(formData.startDate as string).toISOString(),
      endDate: dayjs(formData.endDate as string).toISOString(),
    };
    onSubmit(onSubmitData);
  };

  return (
    <div className={classes.component}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label}>
          <span className={classes.titleField}>Trip Name:</span>
          <input
            className={classes.input}
            type="text"
            name="name"
            defaultValue={tripData.name}
            required
          />
        </label>

        <label className={classes.label}>
          <span className={classes.titleField}>Description:</span>
          <textarea
            rows={24}
            name="description"
            defaultValue={tripData.description}
            className={classes.textarea}
          />
        </label>

        <label className={classes.label}>
          <span className={classes.titleField}>Start date:</span>
          <input
            type="date"
            name="startDate"
            defaultValue={dayjs(tripData.startDate).format('YYYY-MM-DD')}
            className={classes.input}
          />
        </label>

        <label className={classes.label}>
          <span className={classes.titleField}>End date:</span>
          <input
            type="date"
            name="endDate"
            defaultValue={dayjs(tripData.endDate).format('YYYY-MM-DD')}
            className={classes.input}
          />
        </label>

        <label className={classes.label}>
          <span>Is private:</span>
          <input type="checkbox" name="isPrivate" defaultChecked={tripData.isPrivate} />
        </label>

        <button className={classes.button} type="submit">
          Save
        </button>
      </form>
      {tripData._id && (
        <div className={classes.trips}>
          <TripFormEvents tripID={tripData._id} />
        </div>
      )}
    </div>
  );
};

export { TripForm };
