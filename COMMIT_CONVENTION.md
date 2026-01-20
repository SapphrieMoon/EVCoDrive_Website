# Commit Convention (Conventional Commits)

## Format

```
<type>(<scope>): <short description>
```

## Types

* **feat**: Thêm tính năng mới
* **fix**: Sửa bug
* **refactor**: Refactor code, không thêm tính năng, không fix bug
* **style**: Format code (prettier, lint), không ảnh hưởng logic
* **docs**: Thay đổi tài liệu
* **test**: Thêm hoặc sửa test
* **chore**: Công việc lặt vặt (config, build, deps)
* **perf**: Tối ưu performance
* **ci**: Thay đổi CI/CD

## Scope (optional)

Ví dụ:

* auth
* login
* router
* layout
* user
* config

## Examples

```
feat(login): add login page UI
fix(auth): redirect to login when token expired
refactor(router): simplify route configuration
style: format code with prettier
chore: init react router and alias
docs: add commit convention
```

## Rules

* Dùng **tiếng Anh**
* Viết **thì hiện tại**
* Không viết hoa chữ cái đầu
* Không chấm cuối câu
* Message ngắn gọn (≤ 72 ký tự)
