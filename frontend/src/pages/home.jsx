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
import { useNavigate } from 'react-router-dom';

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
        <Button variant="contained"  onClick={newPost}>Nuevo Post</Button >
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {posts.map((post, idx) => (
                <ListItem alignItems="flex-start" key={post.id || idx}>
                    <ListItemAvatar>
                        <AntAvatar alt={post.author} src="/src/assets/images/users/avatar-1.png" />
                    </ListItemAvatar>
                    <ListItemText
                        primary={post.title}
                        secondary={
                            <>
                                <Typography sx={{ display: 'inline' }} variant="body2" color="text.primary">
                                    {post.author}
                                </Typography>
                                {` — ${post.content}`}
                            </>
                        }
                    />
                    {idx < posts.length - 1 && <Divider variant="inset" component="li" />}
                </ListItem>
            ))}
        </List>
        </div>
    )
}
