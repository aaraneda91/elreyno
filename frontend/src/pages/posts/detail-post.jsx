import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';

export default function DetailPost() {

    const { id } = useParams();
    const [post, setPost] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/api/posts/${id}/`)
            .then(res => res.json())
            .then(data => setPost(data))
            .catch(err => console.error(err));
    }, []);

    const eliminarPost = async () => {
        try {
            await fetch(`http://localhost:8000/api/posts/${id}/`, {
                method: 'DELETE'
            });
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
        <Dialog open={openDialog} maxWidth="md">
            <DialogTitle id="alert-dialog-title">{"Seguro que desea eliminar este post?"}</DialogTitle>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)} color="primary">
                    Cancelar
                </Button>
                <Button onClick={eliminarPost} color="error">
                    Aceptar
                </Button>
            </DialogActions>
        </Dialog>

        <MainCard title={post.title }>
        <Typography variant="h1" dangerouslySetInnerHTML={{ __html: post.content }} />
            <Divider sx={{ my: 2 }} />
            <Button variant="outlined" onClick={() => setOpenDialog(true)} color="error">Eliminar</Button>
        </MainCard>
        </div>
    )
}