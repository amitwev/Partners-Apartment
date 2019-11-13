import React from 'react'; 
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
    },
    done:{
        backgroundColor:'green'
    }, 
}));
// need to get data -> if done show different color 
const CardNote = ({id, name, content }) => {
    const classes = useStyles();
    console.log("inside the card note ", id, name, content ) 
    return(
        <Card className={classes.card}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    done
                </Button>
                <Button size="small" color="primary">
                    delete
                </Button>
                <Button size="small" color="primary">
                    update
                </Button>
            </CardActions>
        </Card>
    )
}
export default CardNote;