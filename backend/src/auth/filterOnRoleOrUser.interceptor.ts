import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRole, checkUserRole } from './userRole.enum';
import { GqlExecutionContext } from '@nestjs/graphql';
import { User } from './user.entity';
import { pickBy } from 'lodash';

@Injectable()
export class FilterOnRoleOrUserInterceptor<T extends object> implements NestInterceptor<T | Array<T>, Partial<T> | Array<Partial<T>> > {
    constructor(private filteredKeys: string[], private role?: UserRole | undefined, private userIdKey?: keyof T | undefined) {}
    intercept(
        context: ExecutionContext,
        call$: Observable<T | Array<T>>,
    ): Observable< Partial<T> | Array<Partial<T>> > {
        // get graphql context and user from it
        const ctx = GqlExecutionContext.create(context);
        const user: User = ctx.getContext().req.user;

        // intercept every response in observable and filter it
        return call$.pipe(map(data => {
            // declare filtering function
            const doFilter = (dataToFilter: T): Partial<T> | T => {
                let shouldFilter = true;
                if (!this.role && !this.userIdKey) {
                    shouldFilter = false;
                } else {
                    if (this.userIdKey) {
                        shouldFilter = shouldFilter || Number(dataToFilter[this.userIdKey]) !== Number(user.id);
                    }
                    if (this.role) {
                        shouldFilter = shouldFilter || !checkUserRole((user as User).role, this.role);
                    }
                }

                if  (shouldFilter) {
                    return pickBy(dataToFilter, (_, key) => !this.filteredKeys.includes(key));
                } else {
                    return dataToFilter;
                }
            };
            // filter the object in response or filter array of objects in response
            let filteredData: (Partial<T> | T) | Array<Partial<T> | T>;
            if (Array.isArray(data)) {
                filteredData = data.map(doFilter) as T;
            } else {
                filteredData = doFilter(data);
            }
            
            return filteredData;
        }));
    }
}