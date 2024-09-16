import './styles.scss';

import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import api from '../../services/api';
import StudentTable from './StudentTable';
import StudentDetail from './StudentDetail';

export default function StudentPage() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [studentSelected, setStudentSelected] = useState(null);

    const handleSelectStudent = (student) => {
        if (student?.StudentClass === studentSelected?.StudentClass
            && student?.StudentNumber === studentSelected?.StudentNumber) {
            setStudentSelected(null);
        } else {
            api
                .get(`/students/detail?studentClass=${student.StudentClass}&studentNumber=${student.StudentNumber}`)
                .then(response => response.data)
                .then(data => {
                    setStudentSelected(data);
                })
                .catch(error => setError(error));
        }
    }

    useEffect(() => {
        api
            .get('/students')
            .then(response => response.data)
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(error => setError(error));
    }, [])

    if (loading) return <Loading />;

    return (
        <div className='student-page'>
            <p>{error}</p>

            <StudentDetail data={studentSelected} />
            <StudentTable
                data={data}
                studentSelected={studentSelected}
                handleSelectStudent={handleSelectStudent}
            />
        </div>
    );
}