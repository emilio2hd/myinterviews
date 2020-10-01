import { convertToParamMap, ParamMap, Params, Data } from '@angular/router';
import { ReplaySubject } from 'rxjs';

export interface ActivatedRouteSnapshotStub {
  data?: Data;
  paramMap?: ParamMap;
}

export interface ActivatedRouteProps {
  initialData?: Data;
  initialSnapshot?: ActivatedRouteSnapshotStub;
  initialParams?: Params;
}

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
  // Use a ReplaySubject to share previous values with subscribers
  // and pump new values into the `paramMap` observable
  private subject = new ReplaySubject<ParamMap>();
  private dataSubject = new ReplaySubject<Data>();

  snapshot: ActivatedRouteSnapshotStub;

  constructor(initialProps: ActivatedRouteProps = {}) {
    if (initialProps.initialData) {
      this.setData(initialProps.initialData);
    }

    if (initialProps.initialParams) {
      this.setParamMap(initialProps.initialParams);
    }

    if (initialProps.initialSnapshot) {
      this.snapshot = initialProps.initialSnapshot;
      this.setData(initialProps.initialSnapshot.data);
      this.setParamMap(initialProps.initialSnapshot.paramMap);
    }
  }

  readonly data = this.dataSubject.asObservable();

  /** The mock paramMap observable */
  readonly paramMap = this.subject.asObservable();

  /** Set the paramMap observables's next value */
  setParamMap(params?: Params) {
    this.subject.next(convertToParamMap(params));
  }

  setData(data: any) {
    this.dataSubject.next(data);
  }
}
