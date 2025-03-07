# quick-assist-microservices


## Complete Project Overview

This project is structured as a microservices architecture, utilizing Spring Boot for the backend and Angular for the frontend. This architecture allows for scalability, maintainability, and separation of concerns. Below is a detailed breakdown of each component.

### 1. **Microservices Overview**

#### a. **Admin Service**
- **Responsibilities**: Manages administrative tasks, including user and worker management.
- **Key Features**:
  - Exposes REST APIs for CRUD operations on admin-related data.
  - Uses JPA for data persistence with PostgreSQL.

#### b. **User Service**
- **Responsibilities**: Manages user-related operations, such as user registration, authentication, and profile management.
- **Key Features**:
  - Exposes APIs for user registration and retrieval.
  - Communicates with the Admin Service via Feign clients to provide user data when needed.

#### c. **Worker Service**
- **Responsibilities**: Manages worker-related operations, including worker registration, profile management, and service offerings.
- **Key Features**:
  - Exposes APIs for worker registration and retrieval.
  - Allows workers to update their profiles and manage their service offerings.
  - Communicates with the Admin Service to provide worker data.

#### d. **Booking Service**
- **Responsibilities**: Manages booking-related operations, including creating, updating, and retrieving bookings for services.
- **Key Features**:
  - Exposes APIs for users to book services provided by workers.
  - Handles the logic for checking availability, confirming bookings, and managing booking statuses.
  - Communicates with both the User Service and Worker Service to validate user and worker information during the booking process.

### 2. **API Gateway**
- **Responsibilities**: Acts as a single entry point for all client requests, routing them to the appropriate microservices.
- **Key Features**:
  - Handles authentication and authorization by validating JWT tokens.
  - Routes requests to the appropriate microservice based on the URL.
  - Can implement rate limiting, logging, and monitoring.

### 3. **Service Discovery with Eureka**
- **Responsibilities**: Manages service registration and discovery, allowing microservices to find and communicate with each other.
- **Key Features**:
  - Each microservice registers itself with the Eureka server upon startup.
  - Services can discover other services by querying the Eureka server, enabling dynamic service discovery.
  - Helps in load balancing and failover.

### 4. **Authentication and Security**
- **JWT Authentication**: 
  - The application uses JSON Web Tokens (JWT) for securing API endpoints.
  - The `authInterceptor` in the frontend attaches the JWT to outgoing requests, ensuring that only authenticated users can access protected resources.

- **Role-Based Access Control (RBAC)**: 
  - Implement RBAC to restrict access to certain endpoints based on user roles (e.g., admin, user, worker).

### 5. **Frontend Overview**

The frontend is built using Angular, a popular framework for building single-page applications (SPAs). Here’s a breakdown of its components:

#### a. **Components**
- **Main Component**: 
  - Acts as the entry point for the application, rendering the main layout and routing to different views.

- **Landing Page**: 
  - Provides an introduction to the application and allows users to navigate to login or signup pages.

- **Create Account Component**: 
  - Allows users to choose between creating a customer or worker account, routing them to the appropriate signup forms.

- **Login Page**: 
  - Handles user authentication, allowing users to log in and receive a JWT for subsequent requests.

#### b. **Routing**
- **Angular Router**: 
  - The application uses Angular's routing module to manage navigation between different components and views.
  - Routes are defined in `app.routes.ts`, mapping URLs to specific components.

#### c. **State Management**
- **AuthService**: 
  - Manages user authentication state and stores the JWT in session storage.
  - Initializes the user session when the application starts.

### 6. **Data Management**
- **Database Structure**: 
  - Each service can have its own database schema or share a common database, depending on the design choice. For example:
    - **User Service**: User-related tables (e.g., user profiles, credentials).
    - **Worker Service**: Worker-related tables (e.g., worker profiles, service offerings).
    - **Booking Service**: Booking-related tables (e.g., bookings, availability).

### 7. **Deployment Considerations**
- **Containerization**: 
  - Consider using Docker to containerize your microservices for easier deployment and scaling.
  
- **Orchestration**: 
  - Use Kubernetes or similar orchestration tools to manage your microservices in production, ensuring high availability and scalability.

### Conclusion

This project is a well-structured microservices architecture that leverages Spring Boot for the backend and Angular for the frontend. The use of JWT for authentication, Eureka for service discovery, and an API Gateway for routing requests are all best practices in modern application development. 

This architecture allows for scalability, maintainability, and a clear separation of concerns, making it easier to develop, test, and deploy each service independently.


