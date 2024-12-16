import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUser = localStorage.getItem('currentUser');
  const token = currentUser ? JSON.parse(currentUser).token : null;
  if (token) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });

    return next(modifiedReq);
  }
  return next(req);
};
