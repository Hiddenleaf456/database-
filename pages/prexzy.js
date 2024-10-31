import { useEffect, useState } from 'react';

export default function Home() {
    const [entries, setEntries] = useState([]);
    const [numberInput, setNumberInput] = useState('');
    const [entryKey, setEntryKey] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await fetch('/bot/prexzy');
                if (!response.ok) throw new Error('Failed to fetch entries');
                const data = await response.json();
                setEntries(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEntries();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEntry = `${numberInput}@s.whatsapp.net`;

        setSubmitting(true);
        try {
            const response = await fetch('/api/numbers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key: entryKey, entry: newEntry }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            setEntries((prev) => [...prev, newEntry]);
            setNumberInput('');
            setEntryKey('');
        } catch (err) {
            alert(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (entryToDelete) => {
        setDeleting(true);
        try {
            const response = await fetch('/api/numbers', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ key: entryKey, entry: entryToDelete }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }

            setEntries((prev) => prev.filter((entry) => entry !== entryToDelete));
        } catch (err) {
            alert(err.message);
        } finally {
            setDeleting(false);
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>Error: {error}</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Numbers List</h1>
            <ul style={styles.list}>
                {entries.map((entry) => (
                    <li key={entry} style={styles.listItem}>
                        {entry}
                        <button
                            onClick={() => handleDelete(entry)}
                            disabled={deleting}
                            style={styles.deleteButton}
                        >
                            {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </li>
                ))}
            </ul>
            <h2 style={styles.subHeader}>Add New Entry</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Number"
                    value={numberInput}
                    onChange={(e) => setNumberInput(e.target.value)}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    placeholder="Entry Key"
                    value={entryKey}
                    onChange={(e) => setEntryKey(e.target.value)}
                    required
                    style={styles.input}
                />
                <button type="submit" disabled={submitting} style={styles.button}>
                    {submitting ? 'Adding...' : 'Add'}
                </button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    header: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    subHeader: {
        marginTop: '20px',
        marginBottom: '10px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        padding: '10px',
        borderBottom: '1px solid #ccc',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    loading: {
        textAlign: 'center',
        margin: '20px 0',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: '20px 0',
    },
};