import {  Box, Button, Paper, Typography } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { DeleteRounded } from '@mui/icons-material';
const Task = ({title,completed,handleTick,onDelete}) => {

  return (
   <>
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: "80vw",
          height: 'auto',
          minWidth:300
        },
      }}
    >
        
      <Paper elevation={3} sx={{
        p:2,
        display:'flex',
        justifyContent:"space-between"
      }}>
        <Typography variant="p" textAlign={'left'} sx={{textDecoration: completed?"line-through":""}} >
           {title} 
        </Typography>
        <Box display={'flex'}>

        {completed!==true && <Button onClick={()=>handleTick(title)}>
            <CheckRoundedIcon/>
        </Button>}
        <Button onClick={()=>onDelete(title)}
            sx={{color:'red'}}>
            <DeleteRounded/>
        </Button>
        </Box>

      </Paper>
      
    </Box>
   </>
  )
}

export default Task;