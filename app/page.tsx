"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, ExternalLink, Code, Palette, Database, GitBranch, Phone, MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState, useRef } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import emailjs from "@emailjs/browser"

interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
}

const projects: Project[] = [
  {
    title: "Новогодняя открытка",
    description: "Анимированная новогодняя открытка с поздравлением.",
    image: "/images/christmas-card.jpg",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript", "CSS-анимации", "HTML5 Audio API", "Lucide React", "CSS-графика", "JavaScript"],
    githubUrl: "https://github.com/Artem18071998/christmas-card",
    liveUrl: "https://christmas-card-sable.vercel.app/",
  },
  {
    title: "Приложение для управления задачами",
    description: "Приложение для управления задачами с функциями создания, редактирования и отслеживания прогресса.",
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "TypeScript", "Redux", "Material-UI"],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://task-manager-demo.vercel.app",
  },
  {
    title: "Портфолио веб-разработчика",
    description: "Адаптивное портфолио для веб-разработчика с навыками, проектами и контактной формой.",
    image: "/images/portfolio.jpg",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Lucide React", "next-themes"],
    githubUrl: "https://github.com/Artem18071998/frontend-developer-portfolio",
    liveUrl: "https://frontend-developer-portfolio-ilfu.vercel.app",
  },
]

interface SkillCategory {
  name: string
  icon: React.ReactNode
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    icon: <Code className="w-8 h-8 text-blue-500" />,
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React", "Next.js"],
  },
  {
    name: "Стилизация",
    icon: <Palette className="w-8 h-8 text-purple-500" />,
    skills: [
      "Tailwind CSS",
      "CSS Modules",
      "Styled Components",
      "Material UI",
      "Framer Motion",
    ],
  },
  {
    name: "Backend",
    icon: <Database className="w-8 h-8 text-green-500" />,
    skills: ["Node.js", "PostgreSQL", "REST API"],
  },
  {
    name: "Инструменты",
    icon: <GitBranch className="w-8 h-8 text-orange-500" />,
    skills: ["Git", "GitHub", "VS Code", "npm/yarn"],
  },
]

export default function Home() {
  // Функция для плавного скролла
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      // Обновляем URL без перезагрузки страницы
      window.history.pushState({}, "", `#${sectionId}`)
    }
  }

  // Обработка хэша в URL при загрузке страницы
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" })
        }, 100)
      }
    }
  }, [])

  // Добавляем состояние для отслеживания загрузки резюме
  const [isDownloading, setIsDownloading] = useState(false)

  // Функция для скачивания резюме с индикацией загрузки
  const handleDownloadResume = () => {
    setIsDownloading(true)

    // Имитация задержки загрузки (можно удалить в реальном проекте)
    setTimeout(() => {
      setIsDownloading(false)
    }, 1500)
  }

  // Состояния для формы обратной связи
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{ success?: boolean; error?: string } | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // Функция для отправки формы через EmailJS
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  if (!formRef.current) return;
  
  setIsSubmitting(true);
  setFormStatus(null);
  
  // Используем переменные окружения вместо жестко закодированных значений
const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';

// Проверяем, что все необходимые переменные окружения установлены
if (!serviceId || !templateId || !publicKey) {
  setFormStatus({ error: 'Ошибка конфигурации EmailJS. Пожалуйста, свяжитесь с администратором сайта.' });
  setIsSubmitting(false);
  return;
}
  
  emailjs.sendForm(serviceId, templateId, formRef.current, publicKey)
    .then((result) => {
      console.log('Успех!', result.text);
      setFormStatus({ success: true });
      formRef.current?.reset();
    })
    .catch((error) => {
      console.error('Ошибка!', error.text);
      setFormStatus({ error: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз.' });
    })
    .finally(() => {
      setIsSubmitting(false);
    });
};

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <div className="flex items-center">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">Артём Корочанский</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="transition-colors hover:text-blue-400">
                Обо мне
              </a>
              <a href="#skills" onClick={(e) => scrollToSection(e, "skills")} className="transition-colors hover:text-blue-400">
                Навыки
              </a>
              <a href="#projects" onClick={(e) => scrollToSection(e, "projects")} className="transition-colors hover:text-blue-400">
                Проекты
              </a>
              <a href="#contact" onClick={(e) => scrollToSection(e, "contact")} className="transition-colors hover:text-blue-400">
                Контакты
              </a>
            </nav>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1">
        <section id="about" className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0"
            >
              <Image
                src="/images/001.jpg"
                alt="Артём Корочанский"
                width={200}
                height={200}
                className="rounded-full border-4 border-blue-500 dark:border-blue-400"
                priority
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex max-w-[980px] flex-col items-start gap-2"
            >
              <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
                Привет, я Артём Корочанский
                <br className="hidden sm:inline" />
                <span className="text-blue-500 dark:text-blue-400">Frontend Developer</span>
              </h1>
              <p className="max-w-[700px] text-lg text-muted-foreground">
                Я создаю красивые и функциональные веб-приложения, используя современные технологии и лучшие практики
                разработки. Я специализируюсь на создании отзывчивых и интуитивно понятных пользовательских интерфейсов.
              </p>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex gap-4"
          >
            <Button asChild onClick={handleDownloadResume} disabled={isDownloading}><a href="/cv-resume.pdf" download> {isDownloading ? "Загрузка..." : "Скачать резюме"} </a></Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Связаться со мной
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1e293b] border-[#2d3a4f] text-white">
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-[#2d3a4f] focus:bg-[#2d3a4f]"
                  onClick={(e) => {
                    e.preventDefault()
                    const contactSection = document.getElementById("contact")
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Форма обратной связи</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-[#2d3a4f] focus:bg-[#2d3a4f]" asChild>
                  <a href="https://mail.google.com/mail/u/0/#search/KorochanskyyArtem1998%40gmail.com?compose=DmwnWrRtswLvXvctsdKFjdVFHLlXRnXRcfBPftbZlmxLZkVGcKwgCljLJkhJMtzsWQfkmZDhFTJq">
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Email</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-[#2d3a4f] focus:bg-[#2d3a4f]" asChild>
                  <a href="https://t.me/Mad_Angel_98" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    <span>Telegram</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-[#2d3a4f] focus:bg-[#2d3a4f]" asChild>
                  <a href="tel:+380662051525">
                    <Phone className="mr-2 h-4 w-4" />
                    <span>Телефон</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </section>

        <section id="skills" className="container py-8 md:py-12 lg:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter md:text-4xl mb-12 text-center"
          >
            Мои навыки
          </motion.h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="bg-[#1e293b] rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge key={skill} className="bg-[#0f172a] hover:bg-[#1e293b] text-white border border-blue-500/30">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="container py-8 md:py-12 lg:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter md:text-4xl mb-8 text-center"
          >
            Мои проекты
          </motion.h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardHeader className="p-0">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-48"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription className="mt-2">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between p-4">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Демо
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="container py-8 md:py-12 lg:py-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tighter md:text-4xl mb-8 text-center"
          >
            Свяжитесь со мной
          </motion.h2>
          <motion.form
            ref={formRef}  // Добавлена ссылка на форму
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto"
            onSubmit={handleSubmit}  // Изменен обработчик отправки
          >

            {formStatus?.success && (
            <div className="p-3 bg-green-500/20 border border-green-500 rounded-md text-white">
            Сообщение успешно отправлено! Я свяжусь с вами в ближайшее время.
            </div>
            )}

            {formStatus?.error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-md text-white">
            {formStatus.error}
            </div>
            )}

            <div className="grid gap-4">
            <div className="grid gap-2">
                <label htmlFor="name">Имя</label>
                <input
                  id="name"
                  name="name"
                  placeholder="Введите ваше имя"
                  className="flex h-10 w-full rounded-md border border-[#2d3a4f] bg-[#1e293b] px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f172a]"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Введите ваш email"
                  className="flex h-10 w-full rounded-md border border-[#2d3a4f] bg-[#1e293b] px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f172a]"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="message">Сообщение</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Введите ваше сообщение"
                  className="flex min-h-[120px] w-full rounded-md border border-[#2d3a4f] bg-[#1e293b] px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f172a]"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-white text-[#0f172a] hover:bg-gray-200"
                disabled={isSubmitting}  // Блокировка кнопки во время отправки
                >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </Button>
            </div>
          </motion.form>
        </section>
      </main>

      <footer className="border-t bg-gray-50 dark:bg-gray-800">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose md:text-left">© 2024 Артём Корочанский. Все права защищены.</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="https://github.com/Artem18071998"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/%D0%B0%D1%80%D1%82%D1%91%D0%BC-%D0%BA%D0%BE%D1%80%D0%BE%D1%87%D0%B0%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-4b8286335"
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://mail.google.com/mail/u/0/#search/KorochanskyyArtem1998%40gmail.com?compose=DmwnWrRtswLvXvctsdKFjdVFHLlXRnXRcfBPftbZlmxLZkVGcKwgCljLJkhJMtzsWQfkmZDhFTJq"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

