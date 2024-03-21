const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground py-8 text-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1  md:text-left md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-xl mb-4">À propos de nous</h4>
            <ul>
              <li className="flex items-center justify-center md:justify-start py-2">
                <i className="fas fa-users mr-3"></i>
                <a href="/equipe" className="hover:underline">
                  Notre équipe
                </a>
              </li>
              <li className="flex items-center justify-center md:justify-start py-2">
                <i className="fas fa-history mr-3"></i>
                <a href="/histoire" className="hover:underline">
                  Notre histoire
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-4">Nos Partenaires</h4>
            {/* Ajoutez des icônes ou logos de partenaires ici */}
          </div>
          <div>
            <h4 className="font-semibold text-xl mb-4">Contact</h4>
            <div className="flex items-center py-2 justify-center md:justify-start">
              <i className="fas fa-envelope mr-3"></i>
              <a href="mailto:contact@example.com">contact@example.com</a>
            </div>
            <div className="flex items-center py-2 justify-center md:justify-start">
              <i className="fas fa-phone mr-3"></i>
              <a href="tel:+123456789">+123456789</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
