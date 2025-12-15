'use client';

import { IEvent } from '@/app/types/Event';
import Envelope from '@/assets/icons/envelope.svg';
import Marker from '@/assets/icons/marker.svg';
import { Avatar } from '@/components/shared/Avatar';
import { Badges } from '@/components/shared/Badges';
import { Sizes } from '@/components/shared/Badges/Badges';
import { Button } from '@/components/shared/Button';
import { ButtonBack } from '@/components/shared/ButtonBack';
import { ButtonLink } from '@/components/shared/ButtonLink';
import { Carousel } from '@/components/shared/Carousel';
import { Popup } from '@/components/shared/Popup';
import { Span } from '@/components/shared/Span';
import { Title } from '@/components/shared/Title';
import { AuthModal } from '@/components/widgets/AuthModal';
import { CardEvent } from '@/components/widgets/CardEvent';
import { SizeCard } from '@/components/widgets/CardEvent/CardEvent';
import { DialogModal } from '@/components/widgets/DialogModal';
import { DialogMode } from '@/components/widgets/DialogModal/DialogModal';
import { InvationEvent } from '@/components/widgets/DialogModal/InvationEvent';
import SuccessModal from '@/components/widgets/SuccessModal/SuccessModal';
import { NextPage } from 'next';

import { usePublicProfile } from './hooks';

import classes from './page.module.css';

const PublicProfile: NextPage = () => {
    const {
        user_id,
        userData,
        eventsData,
        status,
        isOwner,
        showPopup,
        popupCss,
        refPopup,
        closePopup,
        handleHidePopup,
        state,

        events,
        handleSelectEvent,
        sendInvation,

        companionRequest,
        openPopupRequestUser,
        openPopupInvitationCompanion,

        userCompanion,
    } = usePublicProfile();

    //TO DO: Будет ли какая-то сортивка организованных событий в слайдере? К примеру пропускаем состоявшиеся события?
    //TO DO: Ближайшие события организатора или в которых участвует организатор? Если ближайшие события организатора, то такую сортировку можно сделать в первом слайдере. Что показывать в слайдере будет настраиваться в настройках приватности.

    return (
        <>
            {(userData as { user: { _id: string } })?.user && (
                <div className={classes.public}>
                    <ButtonBack />
                    <div className={classes.profile}>
                        <div className={classes.wrapper}>
                            <div className={classes.avatar}>
                                <div className={classes.image}>
                                    <Avatar
                                        name={(userData as { user: { name: string } })?.user.name}
                                        image={
                                            (userData as { user: { image: string } })?.user.image
                                        }
                                        scale={2.5}
                                        id={(userData as { user: { _id: string } })?.user._id}
                                    />
                                </div>

                                <div className={classes.user}>
                                    <Title
                                        tag={'h3'}
                                        style={{ whiteSpace: 'pre-wrap', marginBottom: '2rem' }}
                                    >
                                        {(
                                            userData as { user: { name: string } }
                                        )?.user?.name.replace(' ', '\n')}
                                    </Title>

                                    {(
                                        userData as {
                                            user: { location: { properties: { address: string } } };
                                        }
                                    )?.user?.location?.properties.address && (
                                        <div className={classes.info}>
                                            <Marker
                                                style={{ color: '#575B75', marginRight: '0.75rem' }}
                                            />
                                            {
                                                (
                                                    userData as {
                                                        user: {
                                                            location: {
                                                                properties: { address: string };
                                                            };
                                                        };
                                                    }
                                                )?.user?.location?.properties.address.split(',')[0]
                                            }
                                        </div>
                                    )}

                                    <div className={classes.info}>
                                        <Envelope style={{ marginRight: '0.75rem' }} />
                                        <a
                                            href={`mailto:${(userData as { user: { email: string } })?.user?.email}`}
                                            className={classes.mail}
                                        >
                                            {(userData as { user: { email: string } })?.user?.email}
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {isOwner ? (
                                <ButtonLink
                                    href={`/profile/${user_id}/private`}
                                    text={'To my account'}
                                    width="11.81rem"
                                />
                            ) : (
                                <div className={classes.links}>
                                    {status === 'unauthenticated' ? (
                                        <>
                                            {/* <Button onClick={handleShowPopup}>Chat</Button>

                                            <Button onClick={handleShowPopup}>Invite</Button>

                                            <Button onClick={handleShowPopup}>Add</Button> */}
                                        </>
                                    ) : (
                                        <>
                                            <Button>Chat</Button>

                                            <Button
                                                onClick={() =>
                                                    openPopupInvitationCompanion(
                                                        (userData as { user: { _id: string } })
                                                            ?.user?._id,
                                                        (userData as { user: { name: string } })
                                                            ?.user?.name
                                                    )
                                                }
                                            >
                                                Invite
                                            </Button>

                                            {!userCompanion && (
                                                <Button
                                                    onClick={() =>
                                                        openPopupRequestUser(
                                                            (userData as { user: { _id: string } })
                                                                ?.user?._id,
                                                            (userData as { user: { name: string } })
                                                                ?.user?.name
                                                        )
                                                    }
                                                >
                                                    Add
                                                </Button>
                                            )}
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        <Popup showPopup={showPopup} popupCss={popupCss} refPopup={refPopup}>
                            {status === 'unauthenticated' && (
                                <AuthModal onClose={handleHidePopup} />
                            )}

                            {state.invitationCompanion?.id === state.activePopup && (
                                <DialogModal
                                    name={state.invitationCompanion?.name}
                                    mode={DialogMode.INVITATION}
                                    closePopup={closePopup}
                                    sendInvation={sendInvation}
                                    disabled={state.disableButton}
                                >
                                    <InvationEvent
                                        data={events}
                                        selectedEvent={state.selectedEvent}
                                        handleSelectEvent={handleSelectEvent}
                                    />
                                </DialogModal>
                            )}

                            {/* Приглашение успешно отправлено одному или нескольким пользователям */}
                            {state.successModalOpen && (
                                <SuccessModal
                                    closePopup={closePopup}
                                    name={(userData as { user: { name: string } })?.user.name}
                                    selectedEvent={state.selectedEvent}
                                />
                            )}

                            {state.addedUser?.id === state.activePopup && (
                                <DialogModal
                                    name={state.addedUser?.name}
                                    mode={DialogMode.ADD}
                                    closePopup={closePopup}
                                >
                                    <Button
                                        className={classes.yesButton}
                                        onClick={companionRequest}
                                    >
                                        Yes
                                    </Button>
                                    <Button onClick={closePopup} className={classes.cancelButton}>
                                        Cancel
                                    </Button>
                                </DialogModal>
                            )}
                        </Popup>

                        <div className={classes.details}>
                            <div className={classes.counters}>
                                <div className={classes.attended}>
                                    <div>
                                        {
                                            (
                                                eventsData as {
                                                    allOrganizerEvents: { length: number };
                                                }
                                            )?.allOrganizerEvents.length
                                        }
                                    </div>
                                    <span className={classes.attendedText}>organized events</span>
                                </div>
                            </div>

                            {(userData as { user: { types: string[] } })?.user?.types && (
                                <Badges
                                    badges={
                                        (userData as { user: { types: string[] } })?.user?.types
                                    }
                                    size={Sizes.SMALL}
                                />
                            )}

                            <Span
                                title={
                                    (userData as { user: { description: string } })?.user
                                        ?.description
                                }
                                className={classes.description}
                            />
                        </div>
                    </div>

                    {(eventsData as { allOrganizerEvents: { length: number } })?.allOrganizerEvents
                        .length > 0 && (
                        <Carousel title="Organized events" hideButton marginBottom="3.88rem">
                            {(
                                eventsData as { allOrganizerEvents: IEvent[] }
                            )?.allOrganizerEvents.map((slide: IEvent) => (
                                <CardEvent
                                    key={slide._id}
                                    id={slide._id}
                                    name={slide.name}
                                    description={slide.description}
                                    coord={[
                                        slide.location.coordinates[0],
                                        slide.location.coordinates[1],
                                    ]}
                                    startDate={slide.startDate}
                                    time={slide.time}
                                    image={slide.image}
                                    size={SizeCard.ML}
                                />
                            ))}
                        </Carousel>
                    )}

                    {(eventsData as { allOrganizerEvents: { length: number } })?.allOrganizerEvents
                        .length > 0 && (
                        <Carousel title="Upcoming events" hideButton marginBottom="3.88rem">
                            {(
                                eventsData as { allOrganizerEvents: IEvent[] }
                            )?.allOrganizerEvents.map((slide: IEvent) => (
                                <CardEvent
                                    key={slide._id}
                                    id={slide._id}
                                    name={slide.name}
                                    description={slide.description}
                                    coord={[
                                        slide.location.coordinates[0],
                                        slide.location.coordinates[1],
                                    ]}
                                    startDate={slide.startDate}
                                    time={slide.time}
                                    image={slide.image}
                                    size={SizeCard.ML}
                                />
                            ))}
                        </Carousel>
                    )}
                </div>
            )}
        </>
    );
};

export default PublicProfile;
