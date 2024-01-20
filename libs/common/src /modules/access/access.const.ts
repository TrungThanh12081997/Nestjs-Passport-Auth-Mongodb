/* eslint-disable sonarjs/no-duplicate-string, no-secrets/no-secrets */

/**
 * When new org/room will be created default policy will be generated from this object
 * and inserted to AccessCollection.
 * Using collection hook ".after.insert(userId, doc)"
 * mechanism should insert default rules just after added org/room for SELF, ROOM, IN_ROOM keys
 * but not for SYSTEM and OTHER_IN_ROOM,
 * SYSTEM keys will be checked by function named AccessMgr.checkSystemRule
 * OTHER_IN_ROOM will be added in situation when we add new (other) organisation to room.
 * @link https://docs.google.com/spreadsheet/ccc?key=0AgDZYTZwrLT1dFRYUElJSEYwQ0JiTWpGS1JVYVhtc2c#gid=0
 * @example of Organisation's Access
 * typeOfContent: {
      // User of org1 on org1
        SELF: {
            admin: ['read', 'update'],
            coordinator: ['read', 'update'],
            provider: ['read'],
            aid: ['read']
        },
        // User of circle1 on circle1
        ROOM: {
          n/a
        },
        // User of org1 on circle1
        IN_ROOM: {
          n/a
        },
        // User of org2 on circle1 data own by org1
        OTHER_IN_ROOM: {
          n/a
        },
        // system rules
        SYSTEM: {
            sys_admin:['create', 'read', 'update', 'remove'],
            regular_user:[]
        }
    }
 * @example of Circles's Access
 * typeOfContent: {
      // User of org1 on org1
        SELF: {
          n/a
        },
        // Informal User of circle1 on data owned by org1
        ROOM: {
          person: ['read'],
          gatekeeper: ['add', 'read', 'update_state'],
          carer: ['read'],
        },
        // User of org1 on circle1 on data owned by org1
        IN_ROOM: {
          coordinator: ['add', 'read', 'update_state'],
          provider: ['read'],
          aid: ['read'],
          admin: ['add', 'read', 'update_state'],
        },
        // User of org2 on circle1 data own by org1
        OTHER_IN_ROOM: {
          coordinator: ['read'],
          provider: ['read'],
          aid: ['read'],
          admin: ['read'],
        },
        // system rules
        SYSTEM: {
            sys_admin:['create', 'read', 'update', 'remove'],
            regular_user:[]
        }
    }
 * @type {{}}
 * @private
 */
export const DEFAULT_RULES = {
  // CRUD Organisation entity
  Organisations: {
    SELF: {
      admin: ['read', 'update'],
      coordinator: ['read'],
      provider: ['read'],
      aid: ['read'],
    },
    SYSTEM: {
      sys_admin: ['create', 'read', 'update', 'remove', 'modules_management'],
      regular_user: ['read'], // Should check this if user is not from the Org and SysAdmin
    },
  },
  // CRUD Org's users and manage users' role in Org
  orgRules: {
    SELF: {
      admin: [
        'create',
        'update_roles',
        'remove',
        'update_roles_in_multiple_circles',
        'purchase_credits', // should be moved to Organisations
        'see_credit_details', // should be moved to Organisations
      ],
    },
    SYSTEM: {
      sys_admin: ['create', 'update_roles', 'remove', 'update_roles_in_multiple_circles'],
    },
  },
  // CRUD Service entity
  orgService: {
    SELF: {
      admin: ['create', 'read', 'update', 'remove'],
      coordinator: ['read'],
      provider: ['read'],
      aid: [],
    },
    SYSTEM: {
      sys_admin: ['create', 'read', 'update', 'remove'],
      regular_user: ['read'], // Should check this if user is not from the Org and SysAdmin
    },
  },
  // R of Circle events CUD is validated against each Circle access
  orgCalendar: {
    SELF: {
      admin: ['read', 'filter'],
      coordinator: ['read', 'filter'],
      provider: ['read'],
      aid: [],
    },
    SYSTEM: {
      sys_admin: ['read', 'filter'],
    },
  },
  // CRUD Templates
  orgTemplate: {
    SELF: {
      admin: ['create', 'read', 'update', 'remove'],
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['read'],
      aid: ['read'],
    },
    SYSTEM: {
      sys_admin: ['create', 'read', 'update', 'remove'],
    },
  },
  // CRUD org Documents
  orgDocument: {
    SELF: {
      admin: ['create', 'read', 'update', 'remove'],
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['read'],
      aid: ['read'],
    },
    SYSTEM: {
      sys_admin: ['create', 'read', 'update', 'remove'],
    },
  },
  // See Org Report screen
  orgReport: {
    SELF: {
      admin: ['extract'],
    },
    SYSTEM: {
      sys_admin: ['extract'],
    },
  },
  // CRUD of users from Org
  orgUsers: {
    // User of org1 on org1
    // ownerId = organisationId
    SELF: {
      admin: ['create', 'read-basic', 'read-full', 'update'],
      coordinator: ['read-basic'],
      provider: ['read-basic'],
      aid: [],
    },
    SYSTEM: {
      sys_admin: ['create', 'read-basic', 'update', 'remove'],
    },
  },
  // CRUD of Circles from Organisation
  orgRooms: {
    // User of org1 on org1
    // This one is ok and makes sense on organisation/circle
    SELF: {
      admin: ['read', 'create', 'search', 'export', 'advanced_search', 'export_rooms_csv'],
      coordinator: ['read', 'create', 'search', 'advanced_search'],
      provider: [],
      aid: [],
    },
    SYSTEM: {
      sys_admin: ['create', 'read', 'update', 'remove', 'modules_management'],
    },
  },
  // CRUD of existing users on Circle and manage roles
  // 'create' means add user to circle, and 'remove' is to remove user from Circle
  roomRules: {
    IN_ROOM: {
      coordinator: ['create', 'update_roles', 'update_access', 'remove'],
      admin: ['create', 'update_roles', 'update_access', 'remove'],
    },
    /* Not working because it create access rule with ownerId : organisationId mixing informal member access.
    ROOM: {
      //create/remove user, but update roles!
      gatekeeper: ['create', 'update_roles', 'remove'],
    },
    */
    SYSTEM: {
      sys_admin: ['create', 'update_roles', 'remove'],
    },
  },
  // Read, Update state and Add new Organisations to a Circle
  roomOrganisations: {
    IN_ROOM: {
      coordinator: ['add', 'read', 'update_state'],
      provider: ['read'],
      aid: ['read'],
      admin: ['add', 'read', 'update_state'],
    },
    ROOM: {
      person: ['read'],
      gatekeeper: ['add', 'read'],
      carer: ['read'],
    },
    SYSTEM: {
      sys_admin: ['add', 'read', 'update_state'],
    },
    OTHER_IN_ROOM: {
      coordinator: ['read'],
      provider: ['read'],
      aid: ['read'],
      admin: ['read'],
    },
  },
  // CRUD of circle/roadmap
  roomRoadmap: {
    IN_ROOM: {
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['read'],
      aid: ['read'],
      admin: ['create', 'read', 'update', 'remove'],
    },
    ROOM: {
      person: ['read'],
      gatekeeper: ['read'],
      carer: ['read'],
    },
    SYSTEM: {
      sys_admin: ['read', 'create', 'update', 'remove'],
    },
    OTHER_IN_ROOM: {
      coordinator: ['read'],
      provider: ['read'],
      aid: ['read'],
      admin: ['read'],
    },
  },
  // CRUD of circle/calendar
  roomAppointment: {
    IN_ROOM: {
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['create', 'read', 'update', 'remove'],
      aid: ['create', 'read', 'update', 'remove'],
      admin: ['create', 'read', 'update', 'remove'],
    },
    ROOM: {
      person: ['read'],
      gatekeeper: ['read'],
      carer: ['read'],
    },
    SYSTEM: {
      sys_admin: ['create', 'read', 'update', 'remove'],
    },
    OTHER_IN_ROOM: {
      coordinator: ['read'],
      provider: ['read'],
      aid: [],
      admin: ['read'],
    },
  },
  // CRUD of circle/goals
  // Modal should check for access - bug
  roomGoals: {
    IN_ROOM: {
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['read'],
      aid: ['read'],
      admin: ['read'],
    },
    ROOM: {
      person: ['read'],
      gatekeeper: ['read'],
      carer: ['read'],
    },
    SYSTEM: {
      sys_admin: ['read', 'create', 'update', 'remove'],
    },
    OTHER_IN_ROOM: {
      coordinator: ['read'],
      provider: ['read'],
      aid: [],
      admin: [],
    },
  },
  // CRUD documents/progressNote
  roomProgressNote: {
    IN_ROOM: {
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['create', 'read', 'update', 'remove'],
      aid: ['create', 'read', 'update', 'remove'],
      admin: [],
    },
    ROOM: {
      person: ['read'],
      gatekeeper: ['read'],
      carer: ['read'],
    },
    SYSTEM: {
      sys_admin: ['read', 'create', 'update', 'remove'],
    },
    OTHER_IN_ROOM: {
      coordinator: ['read'],
      provider: [],
      aid: [],
      admin: [],
    },
  },
  // CRUD documents/note
  roomNote: {
    IN_ROOM: {
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['create', 'read', 'update', 'remove'],
      aid: ['create', 'read', 'update', 'remove'],
      admin: ['create', 'read', 'update', 'remove'],
    },
    ROOM: {
      person: ['read', 'update'],
      gatekeeper: ['read', 'update'],
      carer: ['read', 'update'],
    },
    SYSTEM: {
      sys_admin: ['read', 'create', 'update', 'remove'],
    },
    OTHER_IN_ROOM: {
      coordinator: ['read'],
      provider: ['read'],
      aid: [],
      admin: [],
    },
  },
  // CRUD documents/caseInstructions
  roomCaseInstruction: {
    IN_ROOM: {
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['create', 'read', 'update', 'remove'],
      aid: ['read'],
      admin: [],
    },
    ROOM: {
      person: ['read', 'update'],
      gatekeeper: ['read', 'update'],
      carer: ['read', 'update'],
    },
    SYSTEM: {
      sys_admin: ['read', 'create', 'update', 'remove'],
    },
    OTHER_IN_ROOM: {
      coordinator: ['read'],
      provider: ['read'],
      aid: [],
      admin: [],
    },
  },
  // CRUD documents/personalPlan
  roomPersonalPlan: {
    IN_ROOM: {
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['read'],
      aid: [],
      admin: [],
    },
    ROOM: {
      person: ['read'],
      gatekeeper: ['read'],
      carer: ['read'],
    },
    SYSTEM: {
      sys_admin: ['read', 'create', 'update', 'remove'],
    },
    OTHER_IN_ROOM: {
      coordinator: ['read'],
      provider: [],
      aid: [],
      admin: [],
    },
  },
  // CRUD documents/assessment
  roomAssessment: {
    IN_ROOM: {
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: ['read'],
      aid: [],
      admin: [],
    },
    ROOM: {
      person: ['read'],
      gatekeeper: ['read'],
      carer: ['read'],
    },
    SYSTEM: {
      sys_admin: ['read', 'create', 'update', 'remove'],
    },
    OTHER_IN_ROOM: {
      coordinator: ['read'],
      provider: ['read'],
      aid: [],
      admin: [],
    },
  },
  // CRUD documents/progressNote
  // roomClaim[read] is also used to show progressNote/unitPrice and roadmap/Finacial
  roomClaim: {
    IN_ROOM: {
      coordinator: ['create', 'read', 'update', 'remove'],
      provider: [], //  note that 'read' should be removed
      aid: [],
      admin: ['create', 'read', 'update', 'remove'],
    },
    ROOM: {
      person: [],
      gatekeeper: ['read'],
      carer: [],
    },
    SYSTEM: {
      sys_admin: ['read', 'create', 'update', 'remove'],
    },
    OTHER_IN_ROOM: {
      coordinator: [],
      provider: [],
      aid: [],
      admin: [],
    },
  },
  // CRUD of users from Organisations - Informa Circle of Care
  roomUsers: {
    // Default access use when creating Users in a Circle
    /* Not working because it create access rule with ownerId : organisationId mixing informal member access
    ROOM: {
      person: ['read'],
      gatekeeper: ['read', 'update','create'],
      carer: ['read'],
    },
    */
    IN_ROOM: {
      admin: ['create', 'read-basic', 'read-full', 'update'],
      coordinator: ['create', 'read-basic', 'read-full', 'update'],
      provider: ['read-basic'],
      aid: ['read-basic'],
    },
    SYSTEM: {
      sys_admin: ['create', 'read-basic', 'update', 'remove'],
    },
  },
};

export const USER_ROLES = {
  organisation: ['admin', 'coordinator', 'aid', 'provider'],
  circle: ['person', 'gatekeeper', 'carer'],
  // Special roles
  system: ['sys_admin', 'regular_user'],
};

export const ORGANISATION_CONTENT_TYPES = [
  'Rooms',
  'Organisations',
  'orgRules',
  'orgService',
  'orgCalendar',
  'orgTemplate',
  'orgDocument',
  'orgReport',
  'orgUsers',
  'orgRooms',
] as const;

export const CIRCLE_CONTENT_TYPES = [
  'roomRules',
  'roomOrganisations',
  'roomRoadmap',
  'roomAppointment',
  'roomGoals',
  'roomProgressNote',
  'roomNote',
  'roomCaseInstruction',
  'roomPersonalPlan',
  'roomAssessment',
  'roomClaim',
  'roomUsers',
] as const;

export const ACCESS_TYPES = [
  'add',
  'create',
  'read',
  'update',
  'remove',
  'filter',
  'modules_management',
  'update_roles',
  'update_roles_in_multiple_circles',
  'purchase_credits',
  'see_credit_details',
  'update_roles_in_multiple_circles',
  'extract',
  'read-basic',
  'read-full',
  'export',
  'advanced_search',
  'export_rooms_csv',
  'update_access',
  'update_state',
] as const;

export const CIRCLE_DOCUMENT_CONTENT_TYPES_MAP = [
  {
    param: 'notes',
    value: 'roomNote',
  },
  {
    param: 'personal-plan',
    value: 'roomPersonalPlan',
  },
  {
    param: 'case-instructions',
    value: 'roomCaseInstruction',
  },
  {
    param: 'assessment',
    value: 'roomAssessment',
  },
];

export const IS_CIRCLE_DOCUMENT_ACCESS_KEY = 'isCircleDocument';
export const ACCESS_CONTENT_TYPES = [
  'roomClaim',
  'roomAssessment',
  'roomCaseInstruction',
  'roomPersonalPlan',
  'roomNote',
  'roomProgressNote',
  'roomAppointment',
];

export const INFORMAL_USER_ACTIONS = ['read', 'update'];
export const INFORMAL_USER_ROLES = ['person', 'gatekeeper', 'carer'];
export const ORG_USER_ROLES = ['admin', 'coordinator', 'provider', 'aid'];
