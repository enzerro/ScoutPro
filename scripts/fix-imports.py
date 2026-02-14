import os
import re

src_dir = '/vercel/share/v0-project/src'

def fix_imports(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove "use client" directives
    content = re.sub(r'^"use client"\s*\n\s*', '', content, flags=re.MULTILINE)
    content = re.sub(r"^'use client'\s*\n\s*", '', content, flags=re.MULTILINE)
    
    # Replace Next.js Link with React Router Link
    content = re.sub(r'import\s+Link\s+from\s+"next/link"', 'import { Link } from "react-router-dom"', content)
    content = re.sub(r"import\s+Link\s+from\s+'next/link'", 'import { Link } from "react-router-dom"', content)
    
    # Replace Next.js Image with regular img
    content = re.sub(r'import\s+Image\s+from\s+"next/image"', '// Image removed', content)
    content = re.sub(r"import\s+Image\s+from\s+'next/image'", '// Image removed', content)
    
    # Replace usePathname/useRouter with useLocation/useNavigate
    content = re.sub(r'import\s+{\s*usePathname\s*}\s+from\s+"next/navigation"', 'import { useLocation } from "react-router-dom"', content)
    content = re.sub(r'import\s+{\s*useRouter\s*}\s+from\s+"next/navigation"', 'import { useNavigate } from "react-router-dom"', content)
    
    # Fix @/ imports to relative paths based on folder depth
    depth = file_path.replace(src_dir, '').count(os.sep) - 1
    prefix = '../' * depth if depth > 0 else './'
    
    content = re.sub(r'from\s+"@/', f'from "{prefix}', content)
    content = re.sub(r"from\s+'@/", f"from '{prefix}", content)
    content = re.sub(r'import\s+"@/', f'import "{prefix}', content)
    content = re.sub(r"import\s+'@/", f"import '{prefix}", content)
    
    # Replace href= with to= for Links
    content = re.sub(r'<Link\s+([^>]*)href=', r'<Link \1to=', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.ts', '.tsx')) and not file.endswith('.d.ts'):
            file_path = os.path.join(root, file)
            fix_imports(file_path)
            print(f"Fixed: {file_path}")

print("Import fix complete!")
