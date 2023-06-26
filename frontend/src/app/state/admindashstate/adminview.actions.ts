import { createActionGroup, emptyProps } from "@ngrx/store";



export const AdminViewActions = createActionGroup(
    {
        source: 'Admin Dashboard',
        events: {
            'toggle admin latest view':emptyProps(),
            'toggle admin previous view': emptyProps(),
        }
    }
)