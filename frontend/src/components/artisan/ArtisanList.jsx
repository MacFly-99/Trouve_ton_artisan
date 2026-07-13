import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Form, Button } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getArtisans, getVilles, getCategories } from '../../api/artisanApi';
import ArtisanCard from './ArtisanCard';

const ArtisanList = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [artisans, setArtisans] = useState([]);
  const [villes, setVilles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Récupérer les filtres depuis l'URL
  const recherche = searchParams.get('recherche') || '';
  const categorie = searchParams.get('categorie') || '';
  const specialite = searchParams.get('specialite') || '';
  const villeParam = searchParams.get('ville') || '';
  
  const [filters, setFilters] = useState({
    recherche: recherche,
    categorie: categorie,
    specialite: specialite,
    ville: villeParam,
    tri: 'note'
  });

  // Mettre à jour les filtres quand l'URL change
  useEffect(() => {
    console.log('🔄 URL changée:', { recherche, categorie, specialite, villeParam });
    setFilters(prev => ({
      ...prev,
      recherche: recherche || '',
      categorie: categorie || '',
      specialite: specialite || '',
      ville: villeParam || ''
    }));
  }, [recherche, categorie, specialite, villeParam]);

  // Charger les villes et les catégories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [villesRes, categoriesRes] = await Promise.all([
          getVilles(),
          getCategories()
        ]);
        setVilles(villesRes.data || []);
        setCategories(categoriesRes.data || []);
      } catch (err) {
        console.error('Erreur chargement données:', err);
      }
    };
    fetchData();
  }, []);

  // Charger les artisans quand les filtres changent
  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {};
        if (filters.recherche) params.recherche = filters.recherche;
        if (filters.categorie) params.categorie = filters.categorie;
        if (filters.specialite) params.specialite = filters.specialite;
        if (filters.ville) params.ville = filters.ville;
        if (filters.tri) params.tri = filters.tri;
        
        console.log('📡 Filtres appliqués pour la requête:', params);
        
        const response = await getArtisans(params);
        setArtisans(response.data || []);
        console.log(`✅ ${response.data?.length || 0} artisans chargés`);
      } catch (err) {
        console.error('❌ Erreur chargement artisans:', err);
        setError('Erreur lors du chargement des artisans');
        setArtisans([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtisans();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Réinitialiser les filtres
  const handleReset = () => {
    setFilters({
      recherche: '',
      categorie: '',
      specialite: '',
      ville: '',
      tri: 'note'
    });
    navigate('/artisans');
  };

  // Filtrer par catégorie (clic sur un bouton de catégorie)
  const handleCategoryClick = (categorieNom) => {
    console.log(`📂 Filtrage par catégorie: "${categorieNom}"`);
    if (categorieNom) {
      navigate(`/artisans?categorie=${encodeURIComponent(categorieNom)}`);
    } else {
      navigate('/artisans');
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Chargement des artisans...</p>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>Artisans - Trouve ton artisan</title>
        <meta name="description" content="Découvrez tous les artisans de la région Auvergne-Rhône-Alpes." />
      </Helmet>
      
      <Container className="py-4">
        <h1 className="mb-4" style={{ color: '#00497c' }}>Nos artisans</h1>

        {/* Filtres rapides par catégorie */}
        <div className="mb-4">
          <span className="text-secondary me-2">Filtrer par catégorie :</span>
          <Button 
            variant={!filters.categorie ? 'primary' : 'outline-primary'} 
            size="sm" 
            className="me-2 mb-2"
            onClick={() => handleCategoryClick('')}
          >
            Tous
          </Button>
          {categories.map((cat) => (
            <Button 
              key={cat.id}
              variant={filters.categorie === cat.nom ? 'primary' : 'outline-primary'} 
              size="sm" 
              className="me-2 mb-2"
              onClick={() => handleCategoryClick(cat.nom)}
            >
              {cat.nom}
            </Button>
          ))}
        </div>
        
        {/* Affichage des filtres actifs */}
        {(filters.recherche || filters.categorie || filters.specialite || filters.ville) && (
          <div className="mb-3">
            <span className="text-secondary">Filtres actifs : </span>
            {filters.recherche && <span className="badge bg-primary me-2">🔍 {filters.recherche}</span>}
            {filters.categorie && <span className="badge bg-primary me-2">📂 {filters.categorie}</span>}
            {filters.specialite && <span className="badge bg-primary me-2">🔧 {filters.specialite}</span>}
            {filters.ville && <span className="badge bg-primary me-2">🏙️ {filters.ville}</span>}
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={handleReset}
            >
              ✕ Réinitialiser
            </Button>
          </div>
        )}
        
        <Row className="mb-4">
          <Col md={4} className="mb-3">
            <Form.Select
              name="ville"
              value={filters.ville}
              onChange={handleFilterChange}
              aria-label="Filtrer par ville"
            >
              <option value="">Toutes les villes</option>
              {villes.map((ville) => (
                <option key={ville} value={ville}>{ville}</option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4} className="mb-3">
            <Form.Select
              name="tri"
              value={filters.tri}
              onChange={handleFilterChange}
              aria-label="Trier les résultats"
            >
              <option value="note">Trier par note (décroissant)</option>
              <option value="nom">Trier par nom (A-Z)</option>
            </Form.Select>
          </Col>
          <Col md={4} className="mb-3 text-md-end">
            <span className="text-secondary">
              {artisans.length} artisan{artisans.length > 1 ? 's' : ''} trouvé{artisans.length > 1 ? 's' : ''}
            </span>
          </Col>
        </Row>
        
        {error && (
          <Alert variant="danger">{error}</Alert>
        )}
        
        {!error && artisans.length === 0 ? (
          <Alert variant="info">
            <Alert.Heading>Aucun résultat</Alert.Heading>
            <p>
              {filters.recherche && `Aucun artisan trouvé pour "${filters.recherche}".`}
              {filters.categorie && ` Aucun artisan dans la catégorie "${filters.categorie}".`}
              {filters.specialite && ` Aucun artisan avec la spécialité "${filters.specialite}".`}
              {filters.ville && ` Aucun artisan à "${filters.ville}".`}
              {!filters.recherche && !filters.categorie && !filters.specialite && !filters.ville && 'Essayez de modifier vos filtres.'}
            </p>
            <Button variant="outline-info" onClick={handleReset}>
              Réinitialiser les filtres
            </Button>
          </Alert>
        ) : (
          <Row>
            {artisans.map((artisan) => (
              <Col key={artisan.id} lg={4} md={6} className="mb-4">
                <ArtisanCard artisan={artisan} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
};

export default ArtisanList;