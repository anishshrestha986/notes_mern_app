import { Location } from 'react-router-dom';

export interface LocationWithNav extends Location {
  state: { path: string };
}
