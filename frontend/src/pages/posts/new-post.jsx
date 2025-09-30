import { useState } from 'react';
import MainCard from 'components/MainCard';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReactQuill from 'components/third-party/ReactQuill';
import axiosServices from 'utils/axios';
import { useNavigate } from 'react-router-dom';
import 'assets/post-detail.css';


export default function NewPost() {
	const [content, setContent] = useState('');
	const [title, setTitle] = useState('');
	const author = 'aaraneda';
	const navigate = useNavigate();

	const goHome = () => {
		navigate('/home');
	}

	const handleSubmit = async () => {
		try {
			await axiosServices.post('http://localhost:8000/api/posts/', {
			title,
			content,
			author
			});
			goHome();
		} catch (error) {
			// Opcional: mostrar mensaje de error
		}
	};

	return (
		<MainCard title="Nuevo Post">
			<FormControl fullWidth >
				<TextField label="Título" variant="outlined" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />
				<ReactQuill value={content} onChange={setContent} className="react-quill-custom" />
				<Button 
					variant="contained" 
					color="primary" 
					sx={{ mt: 14, width: '10%' }} onClick={handleSubmit}
				>
					Publicar
				</Button>
			</FormControl>
		</MainCard>
	);
}

