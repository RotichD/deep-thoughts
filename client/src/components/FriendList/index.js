import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const FriendList = ({ friendCount, username, friends }) => {
    if (!friends || !friends.length) {
        return <p className="bg-dark text-light p-3">{username}, make some friends!</p>;
    }

    return(
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        {username}'s {friendCount} {friendCount === 1 ? 'friend' : 'friends'}
                    </Typography>
                </Grid>
                
                    {friends.map(friend => (
                        <Grid item xs={12}>
                        <Button color="primary" variant="contained" key={friend._id}>
                            <Link to={`/profile/${friend.username}`} style={{ color: "white" }}>{friend.username}</Link>
                        </Button>
                        </Grid>
                    ))}
                
            </Grid>
        </div>
    );
};

export default FriendList;