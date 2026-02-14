import os
import shutil

# Copy UI components
src = '/vercel/share/v0-project/components/ui'
dst = '/vercel/share/v0-project/src/components/ui'
if os.path.exists(src):
    shutil.copytree(src, dst, dirs_exist_ok=True)
    print(f"Copied UI components from {src} to {dst}")

# Copy hooks
src_hooks = '/vercel/share/v0-project/hooks'
dst_hooks = '/vercel/share/v0-project/src/hooks'
if os.path.exists(src_hooks):
    shutil.copytree(src_hooks, dst_hooks, dirs_exist_ok=True)
    print(f"Copied hooks from {src_hooks} to {dst_hooks}")

print("Copy complete!")
