import { useMemo } from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Dialog, Grid, Typography } from '../../mui';
import { useAuth, useModal } from '../../Hooks';
import teacherImage from '../../Assets/teacher.png';
import studentImage from '../../Assets/student.png';
import { TRole } from '../../Contexts/Auth/types';
import { properCase } from '../../Utils';

function RoleModal() {
  const { setAuthModal, roleModal, setRoleModal } = useModal();
  const { setRole } = useAuth();

  const chooseRole = (role: TRole) => () => {
    setRole(role);
    setAuthModal('login');
    setRoleModal('CLOSED');
  };

  const closeModal = () => {
    setRoleModal('CLOSED');
    setAuthModal(undefined);
  };

  const roles:TRole[] = ['teacher', 'student'];

  const memoizedRoleModalCard = useMemo(
    () => roles.map((role) => {
      const image = role === 'teacher' ? teacherImage : studentImage;
      return (
        <Grid key={role} item sm={6} xs={12}>
          <Card style={{ boxShadow: '0 7px #F9AA33', border: '1px solid', borderRadius: '10px' }}>
            <CardActionArea onClick={chooseRole(role)}>
              <CardMedia component="img" image={image} alt={role} />
              <CardContent>
                <Typography variant="h4" fontWeight={600}>
                  {properCase(role)}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    }),
    [roles, chooseRole],
  );

  return (
    <Dialog open={roleModal === 'OPEN'} onClose={closeModal}>
      <Grid container spacing={5} textAlign="center" p="30px">

        <Grid item xs={12}>
          <Typography alignSelf="center" variant="h4" fontWeight={600}>
            Continue as
          </Typography>
        </Grid>

        {memoizedRoleModalCard}

      </Grid>
    </Dialog>
  );
}

export default RoleModal;
