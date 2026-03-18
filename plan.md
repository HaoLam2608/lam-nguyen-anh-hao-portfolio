# 🚀 KẾ HOẠCH CHI TIẾT XÂY DỰNG PORTFOLIO SPACE-THEMED

**Dựa trên thiết kế Figma bạn gửi**:  
[Space-themed portfolio – Community](https://www.figma.com/design/8xx2alCqao5o7uGiBYj69M/Space-themed-portfolio--Community-?node-id=0-1&p=f&t=26SPl7qF8H0fpHxS-0)

**Mục tiêu**:  
- Giống 99% Figma (vibe vũ trụ: nền đen cosmic, sao lấp lánh, neon glow xanh tím, particle, animation mượt).  
- Đẹp hơn nhờ code thực tế (animation 3D, smooth scroll, responsive hoàn hảo).  
- Dễ bảo trì, SEO tốt, deploy nhanh.  

---

## 1. Công nghệ sử dụng (Tech Stack – tối ưu nhất cho space theme)

| Phần              | Công nghệ                          | Lý do chọn |
|-------------------|------------------------------------|----------|
| Framework         | Next.js 14+ (App Router) + TypeScript | SEO, tốc độ, scale dễ |
| Styling           | Tailwind CSS + `clsx` + CSS variables | Neon glow cực dễ, nhanh |
| Animation         | Framer Motion + Lenis              | Scroll reveal, parallax, typing, hover |
| Particle & 3D     | react-tsparticles hoặc @react-three/fiber + three.js | Starfield + hành tinh bay |
| Icons             | lucide-react + custom SVG          | Rocket, planet, astronaut |
| Form liên hệ      | react-hook-form + zod + EmailJS    | Không cần backend |
| Deploy            | Vercel                             | Miễn phí + preview mỗi commit |
| Tools khác        | Prettier + ESLint + Husky + shadcn/ui (tùy chọn) | Code sạch |

**Lý do tổng**: Đây là stack chuẩn nhất của mọi space portfolio trên GitHub/YouTube. Load siêu nhanh, animation mượt như Figma.

---

## 2. Cấu trúc thư mục dự án (rõ ràng, chuyên nghiệp)

```bash
my-space-portfolio/
├── app/
│   ├── layout.tsx          # Global layout + particle background toàn trang
│   ├── page.tsx            # Trang chính (SPA – smooth scroll)
│   └── globals.css         # Neon variables + custom animation
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Timeline.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── ui/                 # ButtonNeon, CardProject, Modal...
├── public/
│   ├── images/
│   │   ├── avatar-orbit.png
│   │   ├── project-*.png
│   │   └── planets/
│   └── icons/
├── lib/
│   ├── emailjs.ts
│   └── utils.ts
├── types/
├── README.md               # ← Chính là file này
└── PLAN.md                 # (bạn có thể rename)

3. Từng giao diện / Section (SPA – chỉ 1 trang)
3.1 Navbar (fixed top)

Logo: Hình hành tinh + tên bạn (glow neon khi hover)
Menu: Home / About / Skills / Projects / Contact (desktop)
Mobile: Hamburger slide-in từ phải (Framer Motion)
Effect: Background transparent → blur + border neon khi scroll xuống
Code chính: useScroll của Framer Motion

3.2 Hero Section (full viewport – trang đầu tiên)

Background: Starfield particle (tsparticles) + gradient tím-đen + vài hành tinh bay chậm (Three.js)
Nội dung:
Heading lớn “Xin chào, tôi là Lâm – Space Explorer / Full-stack Developer” (typing animation)
Subtitle + 2 button: “Khám phá hành tinh” (View Projects) + “Gửi tín hiệu” (Contact)

Floating: Astronaut nhỏ bay quanh (orbit animation)
Scroll indicator: Mũi tên pulse xuống
Responsive: Text to center trên mobile

3.3 About Me

Desktop: 2 cột – Trái: Ảnh cá nhân trong vòng tròn có orbit rings neon (CSS + Framer). Phải: Bio + 4 stats (Years coding, Projects, Clients, Coffee)
Background: Nebula gradient nhẹ
Animation: Text fade-in khi scroll vào
Mobile: Stack 1 cột

3.4 Skills (Kỹ năng vũ trụ)

Tiêu đề “Kỹ năng của tôi trong dải ngân hà”
2 lựa chọn (bạn chọn hoặc kết hợp):
Grid cards: Icon + tên + circle progress (animate)
Hoặc orbiting planets: Mỗi skill là hành tinh nhỏ xoay (Three.js nhẹ)

Hover: Card glow + scale 1.1
Tech list: React, Next.js, Tailwind, Node.js, Figma… (thay bằng của bạn)

3.5 Projects (Dự án – trọng tâm)

Grid 3 cột desktop / 1-2 cột mobile
Mỗi card:
Ảnh project (hover zoom + overlay gradient)
Title + mô tả ngắn
Tech tags (neon pills)
2 button: GitHub + Live Demo (icon rocket)

Click card → Modal chi tiết (Framer Motion)
Filter: All / Web / Mobile / UI (nếu Figma có)
Animation: Stagger fade-in khi scroll

3.6 Experience / Journey (Timeline)

Vertical timeline với đường nối hình chòm sao
Mỗi item: Năm + Role + Company + mô tả + logo
Animation: Line vẽ dần + dot glow khi scroll

3.7 Contact (Gửi tín hiệu)

Form: Name, Email, Message (border neon khi focus)
Button “Launch Message” (hover scale + rocket bay)
Bên phải: Social icons (LinkedIn, GitHub, FB) hover neon
Background: Particle nhẹ
Validation: Zod + toast success/error

3.8 Footer

Copyright + links nhanh
Text: “Made with ❤️ & stars in Ho Chi Minh City”
Responsive: Center trên mobile


4. Hiệu ứng Space đặc trưng (phải có để giống Figma 100%)

Star particle background toàn trang (tắt trên mobile để tiết kiệm pin)
Neon glow mọi button/card (box-shadow multiple layers)
Parallax nhẹ + Framer Motion stagger
Hover scale + orbit animation
Optional: Custom cursor hình ngôi sao
Loading screen: Rocket bay vào vũ trụ

5. Lưu ý quan trọng

Ảnh: Dùng Unsplash space + Canva chỉnh neon glow
Class Tailwind: Đặt tên rõ ràng (neon-glow, planet-float, star-particle)
Performance: Thêm prefers-reduced-motion trên mobile
Sau mỗi section xong → bạn gửi screenshot hoặc link GitHub repo cho mình review ngay