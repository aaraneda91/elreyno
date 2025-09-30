// material-ui
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import AntAvatar from 'components/@extended/Avatar'; // Asegúrate de que la ruta sea correcta
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8000/api/posts/')
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    const newPost = () => {
        navigate('/nuevo-post');
    }

    return(
        <div>
        <Button variant="outlined"  onClick={newPost}>Nuevo Post</Button >
        <Divider sx={{ my: 2 }} />
        <List sx={{ width: '80%', bgcolor: 'background.paper' }}>
            {posts.map((post, idx) => (
                <ListItem alignItems="flex-start" key={post.id || idx}>
                    <ListItemAvatar>
                        <AntAvatar alt={post.author} src="/src/assets/images/users/avatar-1.png" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Link to={`/detalle-post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                {post.title}
                            </Link>
                        }
                        onClick={() => navigate(`/detalle-post/${post.id}`)}
                        secondary={
                            <>
                                <Typography sx={{ display: 'inline' }} variant="body2" color="text.primary">
                                    {post.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'right' }}>
                                    {new Date(post.created_at).toLocaleString('es-CL', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </Typography>
                                <Divider sx={{ my: 1 }} />
                            </>
                        }
                    />
                </ListItem>
            ))}
        </List>
        </div>
    )
}
