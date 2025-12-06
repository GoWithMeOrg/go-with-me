'use client';

import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/shared/Button';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { categoriesList, interestsList } from '@/components/shared/Dropdown/dropdownLists';
import { Input } from '@/components/shared/Input';
import { Label } from '@/components/shared/Label';
import { Textarea } from '@/components/shared/Textarea';
import { CreateTag } from '@/components/widgets/CreateTag';
import { Autocomplete } from '@/components/widgets/GoogleMap';
import { optionsFullAdress } from '@/components/widgets/GoogleMap/OptionsAutocomplete';
import { SelectItems } from '@/components/widgets/SelectItems';
import { UploadFile } from '@/components/widgets/UploadFile';
import { UploadFileSizes } from '@/components/widgets/UploadFile/UploadFile';

import { useProfileForm } from './hooks/useProfileForm';

import classes from './ProfileForm.module.css';

export const ProfileForm: FC = () => {
    const {
        error,
        user,
        location,
        interest,
        categories,
        tags,
        handleSubmit,
        onSubmit,
        control,
        handleUploadedFile,
    } = useProfileForm();

    return (
        <>
            {!error && user && location && (
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <div className={classes.formField}>
                        <Controller
                            name="user.image"
                            control={control}
                            render={({ field }) => (
                                <UploadFile
                                    imageUrl={user?.image}
                                    width={180}
                                    height={180}
                                    sizeType={UploadFileSizes.profile}
                                    onUploadedFile={handleUploadedFile}
                                    {...field}
                                />
                            )}
                        />

                        <Controller
                            name="user.firstName"
                            control={control}
                            render={({ field }) => (
                                <Label label={'First Name'}>
                                    <Input
                                        defaultValue={user?.firstName}
                                        onChange={field.onChange}
                                    />
                                </Label>
                            )}
                        />

                        <Controller
                            name="user.lastName"
                            control={control}
                            render={({ field }) => (
                                <Label label={'Last Name'}>
                                    <Input
                                        defaultValue={user?.lastName}
                                        onChange={field.onChange}
                                    />
                                </Label>
                            )}
                        />

                        <Controller
                            name="user.email"
                            control={control}
                            defaultValue={user?.email}
                            render={({ field }) => (
                                <Label label={'Email'}>
                                    <Input defaultValue={user?.email} onChange={field.onChange} />
                                </Label>
                            )}
                        />

                        <Controller
                            name="location"
                            control={control}
                            defaultValue={location}
                            render={({ field }) => (
                                <Label label={'Локация'}>
                                    <Autocomplete
                                        className={classes.location}
                                        onPlaceSelect={field.onChange}
                                        address={location.properties?.address as string}
                                        options={optionsFullAdress}
                                    />
                                </Label>
                            )}
                        />

                        <Controller
                            name="user.description"
                            control={control}
                            render={({ field }) => (
                                <Label label={'Обо мне'}>
                                    <Textarea
                                        defaultValue={user?.description as string}
                                        onChange={field.onChange}
                                        resizeNone
                                    />
                                </Label>
                            )}
                        />

                        <Controller
                            name="categories.categories"
                            control={control}
                            render={({ field }) => (
                                <SelectItems
                                    categoryList={categoriesList}
                                    eventCategories={[...(categories ?? [])]}
                                    titleCategories={'Выбрать категорию'}
                                    badgesShow
                                    onChange={field.onChange}
                                    filter={false}
                                />
                            )}
                        />

                        <Controller
                            name="interest.interests"
                            control={control}
                            render={({ field }) => (
                                <SelectItems
                                    categoryList={interestsList}
                                    eventCategories={[...(interest ?? [])]}
                                    titleCategories={'What subjects are you interested in?'}
                                    badgesShow
                                    onChange={field.onChange}
                                    filter={false}
                                />
                            )}
                        />

                        <Controller
                            name="tag.tags"
                            control={control}
                            render={({ field }) => (
                                <CreateTag
                                    onChange={field.onChange}
                                    eventTags={[...(tags ?? [])]}
                                    title={'Добавить тег'}
                                />
                            )}
                        />
                    </div>

                    <div className={classes.buttons}>
                        <Button size="big" type="submit" className={classes.saveChanges}>
                            Save changes
                        </Button>
                        <ButtonLink
                            href={`/profile/${user._id}/public`}
                            text={'View profile'}
                            width="10.38rem"
                        />
                    </div>
                </form>
            )}
        </>
    );
};

export default ProfileForm;
