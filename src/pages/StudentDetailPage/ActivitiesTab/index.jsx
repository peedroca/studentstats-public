import { useState } from 'react';
import './styles.scss';

export default function ActivitiesTab({ data }) {
    return (
        <div className='activities-container'>
            <h2>Activities</h2>
            <div className='line' />

            {data.map(activity =>
                <Activity
                    ActivityName={activity.ActivityName}
                    DeadlineDate={activity.DeadlineDate}
                    SubmitDate={activity.SubmitDate}
                    IsOverdue={activity.IsOverdue}
                    OverdueDays={activity.OverdueDays}
                    Status={activity.Status}
                />
            )}
        </div>
    );
}

function Activity({
    ActivityName,
    DeadlineDate,
    SubmitDate,
    IsOverdue,
    OverdueDays,
    Status
}) {
    const [isOpen, setIsOpen] = useState(false);

    let iconStatus = '';
    let iconStyle = '';

    switch (Status) {
        case 'Completed':
            iconStatus = 'circle-check';
            iconStyle = 'icon-complete';
            break;
        case 'Overdue':
            iconStatus = 'triangle-exclamation'
            iconStyle = 'icon-overdue'
            break;
        case 'Not delivered':
            iconStatus = 'circle-exclamation'
            iconStyle = 'icon-not-delivered'
            break;
    }

    return (
        <div className='delivery' onClick={() => setIsOpen(!isOpen)}>
            <span className={`icon ${iconStyle}`}>
                <i className={`fa-solid fa-${iconStatus}`}></i>
            </span>
            <div className='info'>
                <p className='title'>{ActivityName}</p>
                {
                    isOpen &&
                    <>
                        <div className='field'>
                            <h4>Data Limite</h4>
                            <p>{DeadlineDate}</p>
                        </div>
                        {SubmitDate &&
                            <div className='field'>
                                <h4>Data da Entrega</h4>
                                <p>{SubmitDate}</p>
                            </div>
                        }
                        {IsOverdue == 1 &&
                            <div className='field'>
                                <h4>Dias em atraso</h4>
                                <p>{OverdueDays}</p>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    );
}