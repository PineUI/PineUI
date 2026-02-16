# 📦 Publishing @pineui/react to NPM

## Prerequisites

1. **NPM Account**: Create at https://www.npmjs.com/signup
2. **Organization**: Create `@pineui` org at https://www.npmjs.com/org/create
3. **Login**: Run `npm login` and enter your credentials

## First Time Publication

```bash
# 1. Navigate to package directory
cd packages/react

# 2. Build the package
npm run build

# 3. Verify build outputs exist
ls -la dist/
# Should see:
# - pineui.standalone.js
# - pineui.es.js
# - pineui.umd.js
# - style.css
# - index.js
# - index.d.ts

# 4. Publish to NPM
npm publish --access public
```

## Updating Existing Package

```bash
cd packages/react

# 1. Update version (choose one)
npm version patch   # 0.1.0 → 0.1.1 (bug fixes)
npm version minor   # 0.1.0 → 0.2.0 (new features)
npm version major   # 0.1.0 → 1.0.0 (breaking changes)

# 2. Build
npm run build

# 3. Publish
npm publish --access public

# 4. Commit version bump
git add package.json
git commit -m "Release v$(node -p "require('./package.json').version")"
git push origin main

# 5. Create git tag
git tag v$(node -p "require('./package.json').version")
git push --tags
```

## After Publishing

1. **Verify on NPM**: Visit https://www.npmjs.com/package/@pineui/react
2. **Test unpkg CDN**:
   - JS: https://unpkg.com/@pineui/react@latest/dist/pineui.standalone.js
   - CSS: https://unpkg.com/@pineui/react@latest/dist/style.css
3. **Update README**: Change GitHub Pages links to unpkg links

## Troubleshooting

### Error: "You must be logged in to publish packages"
```bash
npm login
# Enter username, password, email
```

### Error: "You do not have permission to publish @pineui/react"
- Create the `@pineui` organization first at https://www.npmjs.com/org/create
- Or ask the organization owner to add you as a member

### Error: "Version X.X.X already published"
```bash
# Bump version first
npm version patch
npm publish --access public
```

### Error: "402 Payment Required"
- Scoped packages (@pineui/*) require `--access public` flag
- Free accounts can publish public scoped packages

## Files Included in Package

The `files` field in package.json controls what gets published:
- `dist/` - All built files
- `LICENSE` - License file
- `README.md` - Package documentation

## Testing Before Publishing

```bash
# Pack the package locally (creates .tgz file)
npm pack

# Install in another project to test
cd /path/to/test-project
npm install /path/to/pineui/packages/react/pineui-react-0.1.0.tgz
```

## Versioning Strategy

- **Patch (0.0.X)**: Bug fixes, documentation updates
- **Minor (0.X.0)**: New features, backwards compatible
- **Major (X.0.0)**: Breaking changes

Current version: `0.1.0`

## Post-Publication Checklist

- [ ] Package appears on https://www.npmjs.com/package/@pineui/react
- [ ] unpkg CDN links work
- [ ] Update main README.md with unpkg links
- [ ] Update documentation.html with unpkg links
- [ ] Create GitHub release with tag
- [ ] Announce on social media / communities
