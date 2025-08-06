# CircleCI Configuration

This directory contains the CircleCI configuration for the Portfolio Application.

## Configuration Overview

The CircleCI pipeline is configured with three main jobs:

### 1. Test Job
- **Purpose**: Runs the complete test suite
- **Environment**: Node.js 18.19.0 with test environment
- **Steps**:
  - Checkout code
  - Install dependencies with caching
  - Verify Node.js and npm versions
  - Run linting (if configured)
  - Execute test suite (`npm test`)
  - Run tests with coverage (`npm run test:coverage`)
  - Upload coverage to Codecov (if token configured)
  - Store test results and coverage artifacts

### 2. Build Job
- **Purpose**: Creates production-ready build artifacts
- **Environment**: Node.js 18.19.0 with production environment
- **Steps**:
  - Checkout code
  - Attach workspace from test job
  - Verify dependencies and security
  - Validate package.json
  - Create build artifacts
  - Create production build
  - Store build artifacts

### 3. Code Quality Job
- **Purpose**: Performs final quality checks
- **Environment**: Node.js 18.19.0
- **Steps**:
  - Checkout code
  - Attach workspace from previous jobs
  - Run code quality checks
  - Generate quality report

## Workflow

```
test → build → code-quality
```

### Branch Filtering
- **All branches**: Test job runs on every push
- **main/develop branches**: Build and code-quality jobs run
- **main branch only**: Code quality job runs

## Environment Variables

### Required
- None (all variables are set within the jobs)

### Optional
- `CODECOV_TOKEN`: For uploading coverage reports to Codecov

## Artifacts

### Test Job
- `coverage/`: Test coverage reports
- `test-results/`: Test execution results

### Build Job
- `build-artifacts/`: Development build artifacts
- `production-build/`: Production-ready build

### Code Quality Job
- `code-quality-report/`: Quality assessment report

## Caching

- **node_modules**: Cached between builds for faster dependency installation
- **Workspace**: Shared between jobs for efficient data transfer

## Docker Images

- **Base Image**: `cimg/node:18.19.0`
- **Features**: Node.js 18.19.0, npm, git, and common build tools

## Performance Optimizations

1. **Dependency Caching**: node_modules are cached between builds
2. **Workspace Persistence**: Shared data between jobs
3. **Parallel Execution**: Jobs run in parallel where possible
4. **Efficient Package Installation**: Uses `npm ci` for faster, reliable installs

## Monitoring

### Success Criteria
- All tests pass with required coverage (80% statements, 80% functions, 80% lines, 50% branches)
- No security vulnerabilities above moderate level
- Build artifacts created successfully
- Code quality checks pass

### Failure Handling
- Failed tests prevent build job execution
- Failed builds prevent code quality job execution
- Security vulnerabilities are reported but don't fail the build
- Outdated packages are reported but don't fail the build

## Local Testing

To test the CircleCI configuration locally:

```bash
# Install CircleCI CLI
curl -fLSs https://circle.ci/cli | bash

# Validate configuration
circleci config validate

# Run locally (requires Docker)
circleci local execute --job test
```

## Troubleshooting

### Common Issues

1. **Test Failures**
   - Check test coverage requirements
   - Verify all dependencies are installed
   - Check for environment-specific issues

2. **Build Failures**
   - Verify all required files exist
   - Check for permission issues
   - Ensure workspace is properly attached

3. **Performance Issues**
   - Check cache hit rates
   - Verify workspace persistence
   - Monitor resource usage

### Debug Commands

```bash
# Check CircleCI status
circleci status

# View build logs
circleci build --follow

# Download artifacts
circleci artifacts download
```

## Future Enhancements

1. **Deploy Job**: Add deployment to staging/production environments
2. **Security Scanning**: Integrate security scanning tools
3. **Performance Testing**: Add performance regression testing
4. **Dependency Updates**: Automated dependency updates with testing
5. **Slack Notifications**: Add notifications for build status 