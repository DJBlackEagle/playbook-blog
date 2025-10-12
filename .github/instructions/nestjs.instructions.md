---
applyTo: 'packages/apps/backend/**/*.ts, packages/apps/backend/**/*.js, packages/apps/backend/**/*.json, packages/apps/backend/**/*.spec.ts, packages/apps/backend/**/*.e2e-spec.ts'
description: 'NestJS development standards and best practices for building scalable Node.js server-side applications'
---

# NestJS Development Best Practices

## Your Mission

As GitHub Copilot, you are an expert in NestJS development with deep knowledge of TypeScript, decorators, dependency injection, and modern Node.js patterns. Your goal is to guide developers in building scalable, maintainable, and well-architected server-side applications using NestJS framework principles and best practices.

## Core NestJS Principles

### **1. Dependency Injection (DI)**

- **Principle:** NestJS uses a powerful DI container that manages the instantiation and lifetime of providers.
- **Guidance for Copilot:**
  - Use `@Injectable()` decorator for services, repositories, and other providers
  - Inject dependencies through constructor parameters with proper typing
  - Prefer interface-based dependency injection for better testability
  - Use custom providers when you need specific instantiation logic

### **2. Modular Architecture**

- **Principle:** Organize code into feature modules that encapsulate related functionality.
- **Guidance for Copilot:**
  - Create feature modules with `@Module()` decorator
  - Import only necessary modules and avoid circular dependencies
  - Use `forRoot()` and `forFeature()` patterns for configurable modules
  - Implement shared modules for common functionality

### **3. Decorators and Metadata**

- **Principle:** Leverage decorators to define routes, middleware, guards, and other framework features.
- **Guidance for Copilot:**
  - Use appropriate decorators: `@Controller()`, `@Get()`, `@Post()`, `@Injectable()`
  - Apply validation decorators from `class-validator` library
  - Use custom decorators for cross-cutting concerns
  - Implement metadata reflection for advanced scenarios

#### JSDoc Placement with Decorators (Best Practice)

When documenting any decorated element, always place the JSDoc comment above the decorator and the element. This ensures that documentation tools and IDEs correctly associate the comment with the decorated element. All documentation comments must be written in English.

**Examples:**

// Class (Service)

```typescript
/**
 * This service handles user authentication.
 */
@Injectable()
export class AuthService { ... }
```

// Method

```typescript
class AuthService {
  /**
   * Handles login logic.
   */
  @UseGuards(AuthGuard)
  login() { ... }
}
```

// Property

```typescript
class AuthService {
  /**
   * The user repository instance.
   */
  @InjectRepository(User)
  private userRepository: Repository<User>;
}
```

// Accessor (getter)

```typescript
class AuthService {
  private _token: string;

  /**
   * Gets the current token.
   */
  @Log()
  get token(): string {
    return this._token;
  }
}
```

// Parameter (constructor or method)

```typescript
class AuthService {
  constructor(
    /** The user repository to inject. */
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  updateUser(
    /** The user ID. */
    @Param('id') id: string,
  ) {
    /* ... */
  }
}
```

Placing the JSDoc above the decorator is the recommended and most widely accepted approach for all decorated elements (class, method, property, accessor, parameter).

## Project Structure Best Practices

### **Recommended Directory Structure**

```
src/
├── api/                           # API layer (GraphQL, REST)
│   ├── graphql/                   # GraphQL API
│   │   ├── auth/                  # Auth feature (resolvers, services, modules)
│   │   │   ├── auth.resolver.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   ├── users/                 # Users feature
│   │   │   ├── entities/          # TypeORM or Prisma entities
│   │   │   │   └── user.entity.ts
│   │   │   ├── inputs/            # GraphQL input types
│   │   │   │   ├── create-user.input.ts
│   │   │   │   └── update-user.input.ts
│   │   │   ├── models/            # GraphQL object types/models
│   │   │   │   └── user.model.ts
│   │   │   ├── users.resolver.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   └── graphql.module.ts
│   ├── rest/                      # REST API
│   │   ├── file-upload/           # File upload feature
│   │   │   ├── dto/               # Data Transfer Objects
│   │   │   │   └── upload-file.dto.ts
│   │   │   ├── entities/          # Entities for file upload
│   │   │   │   └── file.entity.ts
│   │   │   ├── file-upload.controller.ts
│   │   │   ├── file-upload.service.ts
│   │   │   └── file-upload.module.ts
│   │   └── rest.module.ts
|   └── api.module.ts
├── common/                        # Shared utilities, pipes, guards, interceptors
│   ├── decorators/                # Shared decorators
│   ├── filters/                   # Shared filters
│   ├── guards/                    # Shared guards
│   ├── interceptors/              # Shared interceptors
│   ├── interfaces/                # Shared interfaces
│   └── pipes/                     # Shared pipes
├── config/                        # Configuration files and modules
│   └── database-config/           # Database configuration module and service
│       ├── database-config.module.ts
│       └── database-config.service.ts
├── shared/                        # Reusable code shared across features
│   ├── services/                  # Singleton or stateless services used by multiple modules/features
│   └── constants/                 # Application-wide constants and configuration values
├── app.module.ts                  # Root module
└── main.ts                        # Application entry point
```

### Explanation

- **api/**  
  Contains all API-related code, separated by protocol (GraphQL, REST). Each API type is further organized by feature/domain.

- **graphql/** and **rest/**  
  Organize features (e.g., `auth`, `users`, `file-upload`) into their own folders. Each feature contains its resolvers/controllers, services, modules, and related files.

- **entities/**, **inputs/**, **models/**, **dto/**  
  Use subfolders to separate entities (database models), input types (for GraphQL), object types/models, and DTOs (for REST).

- **common/**  
  Shared code such as custom pipes, guards, interceptors, and utility functions used across multiple features.

- **config/**  
  Application configuration files and modules (e.g., environment variables, database config). Each configuration file and modules is further organized by feature/domain.

- **shared/**  
  Contains reusable code and resources shared across multiple features or modules.

- **services/**  
  Shared singleton or stateless services that provide common functionality (e.g., utility services, helpers).

- **constants/**  
  Centralized application-wide constants, enums, and configuration values for consistency and maintainability.

- **main.ts**  
  The application’s entry point, responsible for bootstrapping the app.

- **app.module.ts**  
  The root module that imports and configures all feature modules.

---

**This structure:**

- Follows feature-first organization for scalability and maintainability.
- Separates API protocols and concerns for clarity.
- Encourages modular, testable, and reusable code.

### **File Naming Conventions**

- **Controllers:** `*.controller.ts` (e.g., `users.controller.ts`)
- **Resolvers**: `*.resolver.ts` (e.g., `users.resolver.ts`)
- **Services:** `*.service.ts` (e.g., `users.service.ts`)
- **Modules:** `*.module.ts` (e.g., `users.module.ts`)
- **DTOs:** `*.dto.ts` (e.g., `create-user.dto.ts`)
- **Entities:** `*.entity.ts` (e.g., `user.entity.ts`)
- **Guards:** `*.guard.ts` (e.g., `auth.guard.ts`)
- **Interceptors:** `*.interceptor.ts` (e.g., `logging.interceptor.ts`)
- **Pipes:** `*.pipe.ts` (e.g., `validation.pipe.ts`)
- **Filters:** `*.filter.ts` (e.g., `http-exception.filter.ts`)

## API Development Patterns

### **1. Controllers**

- Keep controllers thin - delegate business logic to services
- Use proper HTTP methods and status codes
- Implement comprehensive input validation with DTOs
- Apply guards and interceptors at the appropriate level

```typescript
@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  async findAll(@Query() query: GetUsersDto): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
```

### **2. Services**

- Implement business logic in services, not controllers
- Use constructor-based dependency injection
- Create focused, single-responsibility services
- Handle errors appropriately and let filters catch them

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    await this.emailService.sendWelcomeEmail(savedUser.email);
    return savedUser;
  }
}
```

### **3. DTOs and Validation (REST API)**

- Use class-validator decorators for input validation
- Create separate DTOs for different operations (create, update, query)
- Implement proper transformation with class-transformer

```typescript
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message: 'Password must contain uppercase, lowercase and number',
  })
  password: string;
}
```

### **4. DTOs and Validation (GraphQL)**

> **Note:** When using `@trips/nestjs-query`, manual creation of `@InputType` classes is often not needed, as the library can auto-generate these types for you based on your entity and DTO definitions. However, you must still define your GraphQL `@ObjectType` classes for output types.

- Use `@InputType()` for input DTOs (e.g., mutations, queries arguments)
- Use `@ObjectType()` for output DTOs (GraphQL types returned by resolvers)
- Decorate fields with `@Field()` and specify types for strong typing
- You can use class-validator decorators for input validation as well

```typescript
import { InputType, Field, ObjectType, Int } from '@nestjs/graphql';
import { IsString, IsEmail, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

@ObjectType()
export class UserModel {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;
}
```

## Database Integration

### **Mongoose Integration (Primary)**

- Use Mongoose as the primary ORM for database operations in NestJS projects
- Define schemas and models using `@Schema()` and `@Prop()` decorators from `@nestjs/mongoose`
- Use `MongooseModule.forFeature()` to register models in feature modules
- Leverage Mongoose middleware and hooks for advanced use cases

```typescript
@Schema()
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;
}

export const CatSchema = SchemaFactory.createForClass(Cat);

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }
}
```

### **TypeORM Integration (Alternative for SQL)**

- Use TypeORM as an alternative ORM for SQL database operations
- Define entities with proper decorators and relationships
- Implement repository pattern for data access
- Use migrations for database schema changes

```typescript
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
```

### **Custom Repositories**

- Extend base repository functionality when needed (TypeORM)
- Implement complex queries in repository methods
- Use query builders for dynamic queries

```typescript
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findActiveUsers(): Promise<User[]> {
    return this.createQueryBuilder('user')
      .where('user.isActive = :isActive', { isActive: true })
      .getMany();
  }
}

// Usage in a service
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async getActiveUsers(): Promise<User[]> {
    return this.userRepository.findActiveUsers();
  }
}
```

### **GraphQL Integration**

- Use `@nestjs/graphql` to build GraphQL APIs with NestJS
- Define resolvers using `@Resolver()`, `@Query()`, and `@Mutation()` decorators
- Use code-first or schema-first approaches as appropriate
- Leverage DTOs and input types for strong typing
- Integrate with authentication and guards for secure APIs

```typescript
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.usersService.create(input);
  }
}
```

### **nestjs-query Integration**

- Use `@trips/nestjs-query` for advanced CRUD, filtering, and GraphQL integration.
- Provides decorators and modules for auto-generating resolvers, DTOs, and services.
- Supports pagination, filtering, sorting, and relations out of the box.
- Recommended for projects needing flexible, scalable APIs with minimal boilerplate.
- See the [TriPSs nestjs-query documentation](https://tripss.github.io/nestjs-query/) for setup and usage examples.

## Authentication and Authorization

### **JWT Authentication**

- Implement JWT-based authentication with Passport
- Use guards to protect routes
- Create custom decorators for user context

```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
```

### **Role-Based Access Control**

- Implement RBAC using custom guards and decorators
- Use metadata to define required roles
- Create flexible permission systems

```typescript
@SetMetadata('roles', ['admin'])
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete(':id')
async remove(@Param('id') id: string): Promise<void> {
  return this.usersService.remove(id);
}
```

## Error Handling and Logging

### **Exception Filters**

- Create global exception filters for consistent error responses
- Handle different types of exceptions appropriately
- Log errors with proper context

```typescript
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(`${request.method} ${request.url}`, exception);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message:
        exception instanceof HttpException
          ? exception.message
          : 'Internal server error',
    });
  }
}
```

### **Logging**

- Use built-in Logger class for consistent logging
- Implement proper log levels (error, warn, log, debug, verbose)
- Add contextual information to logs

## Testing Strategies

### **Unit Testing**

- Name test files with .spec.ts suffix
- Test services independently using mocks
- Use Jest as the testing framework
- Create comprehensive test suites for business logic

```typescript
describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a user', async () => {
    const createUserDto = { name: 'John', email: 'john@example.com' };
    const user = { id: '1', ...createUserDto };

    jest.spyOn(repository, 'create').mockReturnValue(user as User);
    jest.spyOn(repository, 'save').mockResolvedValue(user as User);

    expect(await service.create(createUserDto)).toEqual(user);
  });
});
```

### **Integration Testing**

- Use TestingModule for integration tests
- Test complete request/response cycles
- Mock external dependencies appropriately

### **E2E Testing**

- Name test files with .e2e-spec.ts suffix
- Test complete application flows
- Use supertest for HTTP testing
- Test authentication and authorization flows

## Performance and Security

### **Performance Optimization**

- Implement caching strategies with Redis
- Use interceptors for response transformation
- Optimize database queries with proper indexing
- Implement pagination for large datasets

### **Security Best Practices**

- Validate all inputs using class-validator
- Implement rate limiting to prevent abuse
- Use CORS appropriately for cross-origin requests
- Sanitize outputs to prevent XSS attacks
- Use environment variables for sensitive configuration

```typescript
// Rate limiting example
@Controller('auth')
@UseGuards(ThrottlerGuard)
export class AuthController {
  @Post('login')
  @Throttle(5, 60) // 5 requests per minute
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
```

## Configuration Management

### **Environment Configuration**

- Use @nestjs/config for configuration management
- Validate configuration at startup
- Use different configs for different environments

```typescript
@Injectable()
export class ConfigService {
  constructor(
    @Inject(CONFIGURATION_TOKEN)
    private readonly config: Configuration,
  ) {}

  get databaseUrl(): string {
    return this.config.database.url;
  }

  get jwtSecret(): string {
    return this.config.jwt.secret;
  }
}
```

## Common Pitfalls to Avoid

- **Circular Dependencies:** Avoid importing modules that create circular references
- **Heavy Controllers:** Don't put business logic in controllers
- **Missing Error Handling:** Always handle errors appropriately
- **Improper DI Usage:** Don't create instances manually when DI can handle it
- **Missing Validation:** Always validate input data
- **Synchronous Operations:** Use async/await for database and external API calls
- **Memory Leaks:** Properly dispose of subscriptions and event listeners

## Development Workflow

### **Development Setup**

1. Use NestJS CLI for scaffolding: `nest generate module users`
2. Follow consistent file organization
3. Use TypeScript strict mode
4. Implement comprehensive linting with ESLint
5. Use Prettier for code formatting

### **Code Review Checklist**

- [ ] Proper use of decorators and dependency injection
- [ ] Input validation with DTOs and class-validator
- [ ] Appropriate error handling and exception filters
- [ ] Consistent naming conventions
- [ ] Proper module organization and imports
- [ ] Security considerations (authentication, authorization, input sanitization)
- [ ] Performance considerations (caching, database optimization)
- [ ] Comprehensive testing coverage

## Conclusion

NestJS provides a powerful, opinionated framework for building scalable Node.js applications. By following these best practices, you can create maintainable, testable, and efficient server-side applications that leverage the full power of TypeScript and modern development patterns.

---

<!-- End of NestJS Instructions -->
