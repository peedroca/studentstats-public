import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import api from '../../services/api';
import Loading from '../../components/Loading';

import './styles.scss';
import CommentsTab from './CommentsTab';
import GraphsTab from './GraphsTab';
import ActivitiesTab from './ActivitiesTab';
import Header from '../../components/Header';

export default function StudentDetailPage() {
    const [searchParams] = useSearchParams();

    const studentClass = searchParams.get('class');
    const studentNumber = searchParams.get('number');

    const [tab, setTab] = useState('Activities');

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleChangeTab = (newTab) => setTab(newTab);

    const handleResolveTab = () => {
        switch (tab) {
            case 'Comments':
                return <CommentsTab />
            case 'Graphs':
                return <GraphsTab />
            case 'Activities':
                return <ActivitiesTab 
                    data={data}
                    handleUpdate={fetchStudent}
                />
            default:
                return <Loading />
        }
    }

    const fetchStudent = () => api
        .get(`/students/profile?studentClass=${studentClass}&studentNumber=${studentNumber}`)
        .then(response => response.data)
        .then(data => {
            setData(data);
            setLoading(false);
        })
        .catch(error => setError(error));

    useEffect(() => {
        fetchStudent()
    }, [studentClass, studentNumber])

    if (loading) return <Loading />

    return (
        <>
            <Header />
            <div className='student-detail-page'>
                <p>{error}</p>
                <div className='header'>
                    <Link to='/' className='back-button'>
                        <i className='fa-solid fa-circle-arrow-left'></i>
                    </Link>
                    <h1>Student Detail</h1>
                </div>
                <div className='container'>
                    <div className='profile'>
                        {data && data.Image && (
                            <div>
                                <img
                                    id='profile-image'
                                    src={data.Image}
                                    alt={`${data.StudentName}'s profile`}
                                />
                            </div>
                        )}
                        {
                            data &&
                            <div className='basic-info'>
                                <div className='field'>
                                    <label>Name</label>
                                    <p>{data.StudentName}</p>
                                </div>
                                <div className='field'>
                                    <label>Number</label>
                                    <p>{data.StudentNumber}</p>
                                </div>
                                <div className='field'>
                                    <label>Class</label>
                                    <p>{data.StudentClass}</p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='action-container'>
                        <div className='actions'>
                            {/* <span onClick={() => handleChangeTab('Comments')}>
                            <i className={`fa-solid fa-comments button ${tab == 'Comments' && 'button-solid'}`}></i>
                        </span> */}
                            <span onClick={() => handleChangeTab('Activities')}>
                                <i className={`fa-solid fa-file-waveform button ${tab == 'Activities' && 'button-solid'}`}></i>
                            </span>
                            {/* <span onClick={() => handleChangeTab('Graphs')}>
                            <i className={`fa-solid fa-chart-pie button ${tab == 'Graphs' && 'button-solid'}`}></i>
                        </span> */}
                        </div>

                        <div className='tab'>
                            {handleResolveTab()}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
