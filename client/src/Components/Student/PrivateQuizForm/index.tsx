import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Submit } from '../../FormUI';
import { searchForPrivateQuizSchema } from '../../../Validation';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Grid,
  QrCodeIcon,
  InputAdornment,
  Stack,
} from '../../../mui';
import { useModal, useSnackBar } from '../../../Hooks';
import classes from './PrivateQuizForm.module.css';

function PrivateQuizForm() {
  const { enterCodeModal, setEnterCodeModal } = useModal();
  const { showSnackBar } = useSnackBar();
  const navigate = useNavigate();

  const initialValues = { quizId: '' };
  const checkQuizIdValid = async ({ quizId }: { quizId: string }) => {
    try {
      await axios.get(`/api/v1/student/quiz/${quizId}`);
      navigate(`/student/quiz-details?type=private&id=${quizId}`);
      setEnterCodeModal('CLOSED');
    } catch (err: any) {
      showSnackBar('Invalid Quiz Code', 'error');
    }
  };

  return (
    <Dialog open={enterCodeModal === 'OPEN'} onClose={() => setEnterCodeModal('CLOSED')}>
      <Form
        initialValues={initialValues}
        validationSchema={searchForPrivateQuizSchema}
        onSubmit={(values) => checkQuizIdValid(values)}
      >
        <DialogTitle className={classes.title}>Enter Code</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.description}>
            Enter the code you received from your teacher.
          </DialogContentText>
          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} alignItems="center">
            <Input
              name="quizId"
              variant="outlined"
              placeholder="Enter Code"
              label="Quiz Code"
              type="text"
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <QrCodeIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Submit color="secondary" variant="contained" size="large">Attempt</Submit>
          </Stack>
        </DialogContent>
      </Form>
    </Dialog>
  );
}

export default PrivateQuizForm;
