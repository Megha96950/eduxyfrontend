// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const HOSTNAME: string = "localhost";
const PORT_NUMBER: number = 3333;
const APPLICATION_NAME: string = '/Eduxy_Server';
export const environment = {
  production: false,
  userAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/UserAPI',
  teacherAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/TeacherAPI',
  studentAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/StudentAPI',
  chatAPIUrl: 'http://' + HOSTNAME + ':' + PORT_NUMBER + APPLICATION_NAME + '/ChatAPI'
};

